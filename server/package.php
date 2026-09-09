<?php
declare(strict_types=1);

$username = getenv('INFOMANIAK_SMTP_USERNAME') ?: '';
$password = getenv('INFOMANIAK_SMTP_PASSWORD') ?: '';
if (!filter_var($username, FILTER_VALIDATE_EMAIL) || $password === '') {
    fwrite(STDERR, "Configure INFOMANIAK_SMTP_USERNAME and INFOMANIAK_SMTP_PASSWORD in GitHub secrets.\n");
    exit(1);
}

function copyTree(string $source, string $target): void
{
    if (is_dir($source)) {
        if (!is_dir($target) && !mkdir($target, 0755, true)) {
            throw new RuntimeException('Cannot create directory.');
        }
        foreach (new DirectoryIterator($source) as $entry) {
            if (!$entry->isDot()) copyTree($entry->getPathname(), $target . '/' . $entry->getFilename());
        }
    } elseif (!copy($source, $target)) {
        throw new RuntimeException('Cannot copy deployment file.');
    }
}

$target = dirname(__DIR__) . '/dist/api';
$private = $target . '/private';
copyTree(__DIR__ . '/vendor', $private . '/vendor');
copyTree(__DIR__ . '/contact.php', $target . '/contact.php');
$config = ['username' => $username, 'password' => $password];
$files = [
    $private . '/.htaccess' => "Require all denied\n",
    $target . '/.htaccess' => "Options -Indexes\n",
    $private . '/config.php' => "<?php\nif (!defined('ALLGATES_CONTACT')) { http_response_code(404); exit; }\nreturn " . var_export($config, true) . ";\n",
];
foreach ($files as $path => $contents) {
    if (file_put_contents($path, $contents) === false) throw new RuntimeException('Cannot write configuration.');
}
