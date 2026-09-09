<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'method_not_allowed']);
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 32768 || $_FILES !== []) {
    respond(413, ['error' => 'request_too_large']);
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) {
    respond(403, ['error' => 'origin_not_allowed']);
}

function field(string $key, int $limit, bool $required = false): string
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value) || strlen($value) > $limit || str_contains($value, "\0")) {
        respond(422, ['error' => 'invalid_fields']);
    }
    $value = trim($value);
    if ($required && $value === '') respond(422, ['error' => 'invalid_fields']);
    return $value;
}

$email = field('email', 254, true);
$organization = field('structure', 300, true);
$name = field('nom', 200);
$need = field('besoin', 12000, true);
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email)
    || field('_gotcha', 1000) !== '') {
    respond(422, ['error' => 'invalid_fields']);
}

$stage = 'configuration';
$mail = null;
try {
    define('ALLGATES_CONTACT', true);
    $config = require __DIR__ . '/private/config.php';
    require __DIR__ . '/private/vendor/autoload.php';

    $stage = 'rate_limit';
    // Bounded shared counter; no raw IP addresses or messages stored.
    $path = sys_get_temp_dir() . '/allgates-contact-' . hash('sha256', __DIR__) . '.json';
    $file = fopen($path, 'c+');
    if ($file === false || !flock($file, LOCK_EX)) throw new RuntimeException('Rate limiter unavailable.');
    $now = time();
    $state = json_decode(stream_get_contents($file), true) ?: [];
    foreach ($state as $key => $entry) {
        if ($entry['reset'] <= $now) unset($state[$key]);
    }
    $ipKey = hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown', $config['password']);
    $blocked = ($state[$ipKey]['count'] ?? 0) >= 5 || ($state['global']['count'] ?? 0) >= 100;
    if (!$blocked) {
        foreach ([$ipKey, 'global'] as $key) {
            $state[$key] ??= ['count' => 0, 'reset' => $now + 3600];
            $state[$key]['count']++;
        }
    }
    rewind($file);
    if (!ftruncate($file, 0) || fwrite($file, json_encode($state, JSON_THROW_ON_ERROR)) === false || !fflush($file)) {
        throw new RuntimeException('Rate limiter write failed.');
    }
    flock($file, LOCK_UN);
    fclose($file);
    if ($blocked) {
        header('Retry-After: 3600');
        respond(429, ['error' => 'too_many_requests']);
    }

    $stage = 'message_setup';
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'mail.infomaniak.com';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->Timeout = 5;
    $mail->getSMTPInstance()->Timelimit = 10;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->setFrom($config['username'], 'Allgates');
    $mail->addAddress('contact@allgates.net');
    $mail->addReplyTo($email);
    $mail->Subject = 'Nouvelle demande de contact Allgates';
    $mail->Body = "Structure : {$organization}\nNom : {$name}\nEmail : {$email}\n\nBesoin :\n{$need}\n";
    $stage = 'smtp_send';
    $mail->send();
    respond(200, ['accepted' => true]);
} catch (Throwable $error) {
    // Classify locally; never log the raw exception or SMTP transcript, which
    // may contain addresses, credentials or message contents.
    $reason = 'unknown';
    $detail = strtolower($error->getMessage());
    foreach ([
        'authenticate' => 'authentication_failed',
        'connect' => 'connection_failed',
        'tls' => 'tls_failed',
        'recipient' => 'recipient_rejected',
        'data not accepted' => 'message_rejected',
        'from address' => 'sender_rejected',
        'invalid address' => 'invalid_address',
    ] as $needle => $category) {
        if (str_contains($detail, $needle)) {
            $reason = $category;
            break;
        }
    }
    $smtpError = $mail instanceof PHPMailer ? $mail->getSMTPInstance()->getError() : [];
    $smtpCode = (int) ($smtpError['smtp_code'] ?? 0);
    $smtpDetail = '';
    if ($stage === 'smtp_send' && $reason === 'message_rejected') {
        // Only the server's rejection text, never an AUTH exchange or transcript.
        $smtpDetail = (string) ($smtpError['detail'] ?? '');
        $sensitive = [$email, $organization, $name, $need,
            (string) ($config['username'] ?? ''), (string) ($config['password'] ?? '')];
        usort($sensitive, static fn(string $a, string $b): int => strlen($b) <=> strlen($a));
        foreach ($sensitive as $value) {
            if ($value !== '') {
                $smtpDetail = str_replace([$value, base64_encode($value)], '[redacted]', $smtpDetail);
            }
        }
        $smtpDetail = preg_replace('/[^\s<>@]+@[^\s<>@]+/', '[email]', $smtpDetail) ?? '';
        $smtpDetail = preg_replace('/[\x00-\x1f\x7f]/', ' ', $smtpDetail) ?? '';
        $smtpDetail = substr($smtpDetail, 0, 500);
    }
    error_log('Allgates contact: submission failed (' . get_class($error)
        . ') stage=' . $stage . ' reason=' . $reason . ' smtp_code=' . $smtpCode
        . ' smtp_detail=' . $smtpDetail);
    respond(503, ['error' => 'sending_unavailable']);
}
