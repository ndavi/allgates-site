# Réception du formulaire de contact

## SMTP Infomaniak (deploiement de production)

Le workflow GitHub Actions configure `/api/contact.php`, installe PHPMailer et
assemble le PHP dans `dist/api` avant de transferer le site en FTPS.
Chaque push sur `main` declenche ce deploiement.

Configuration initiale dans GitHub > Settings > Secrets and variables > Actions :

- `INFOMANIAK_SMTP_USERNAME` : adresse mail Infomaniak utilisee pour envoyer.
- `INFOMANIAK_SMTP_PASSWORD` : mot de passe de cette adresse, pas celui du Manager.

Activer PHP 8.2 ou plus recent avec OpenSSL sur l'hebergement. Les secrets FTP
existants restent utilises ; le serveur doit accepter FTPS explicite.
Le workflow bloque le transfert si les secrets SMTP sont absents.

L'envoi utilise `mail.infomaniak.com:587` avec STARTTLS. Le destinataire est fixe
a `contact@allgates.net`, et Reply-To contient l'adresse du visiteur.
La configuration se trouve dans `api/private/config.php`, protegee par une garde
PHP et un `.htaccess` interdisant les acces HTTP. L'hebergement doit executer PHP
et respecter `.htaccess`. Ne jamais publier le dossier assemble sur un serveur
statique ni dans une archive publique : il contient les identifiants SMTP.

Validation serveur, honeypot et limite de 5 tentatives par IP et 100 au total par
heure. Le compteur verrouille est stocke dans le temporaire du serveur, avec IP
hachees et sans messages. Il est local a l'instance et peut etre reinitialise par
le nettoyage du temporaire. Le succes signifie que le SMTP a accepte le message,
pas qu'il est arrive dans la boite de reception.

Apres deploiement, effectuer une demande et verifier sa reception ainsi que
l'adresse utilisee par Repondre. Le PHP n'est pas execute par Astro en local :
sans endpoint configure, le comportement local reste celui decrit ci-dessous.

Reference : https://www.infomaniak.com/fr/support/faq/2023/utiliser-lenvoi-authentifie-de-mail-depuis-un-site-web

## Mode local sans service configure

Le site fonctionne sans service externe configuré. Dans cet état, le bouton **Préparer mon email** ouvre la messagerie du visiteur avec un message adressé à `contact@allgates.net`. Le visiteur doit encore l’envoyer depuis sa messagerie et le site n’affiche aucune confirmation de réception.

## Contrat de confirmation SMTP

Le navigateur envoie les champs `email`, `structure`, `nom`, `besoin` et
`_gotcha` vers `/api/contact.php`. Aucun fichier n'est accepté. Le bouton est
désactivé pendant l'envoi et la requête est interrompue après 15 secondes.

Le formulaire confirme l'envoi uniquement avec un statut HTTP réussi et une
réponse JSON contenant `accepted: true`. Le script renvoie cette réponse après
acceptation du message par le serveur SMTP. Une erreur ou une réponse ambiguë
conserve les champs saisis et affiche un échec.

Les tests navigateur interceptent `/api/contact.php` et simulent ses réponses ;
ils n'exécutent pas PHP et n'envoient aucun email réel.

`npm run test:contact` vérifie le client d'envoi.
`npm run test:e2e:service` vérifie le parcours navigateur avec le service simulé.
