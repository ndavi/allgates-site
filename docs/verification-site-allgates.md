# Vérification de l’implémentation Allgates

Date : 6 septembre 2026.

Référence : [plan du site](plan-site-allgates.md). La demande d’implémentation remplace l’ancien statut de cadrage du plan. L’utilisateur a confirmé l’adresse `contact@allgates.net` et le fonctionnement opérationnel et local de la chaîne documentaire décrite.

La réalisation et les vérifications ont été réparties entre trois sous-agents Sol/Terra, puis relues par deux autres sous-agents sur des axes séparés. Le point de départ Git est `2c58a8d2218d728636b7fc31ab98af3e24c17009` ; la revue initiale porte sur le commit `490edf5` et les dernières retouches visuelles.

## Standards

Aucune violation des consignes documentées du dépôt n’a été relevée. Deux observations heuristiques ont été retenues et corrigées :

1. **Duplicated Code** : les branches email et envoi direct répétaient la remise à zéro du bouton et des champs. Un helper local `setSubmitting` gère maintenant cet état.
2. **Speculative Generality** : les options inutilisées du logo et du bloc de contact ont été supprimées. Le texte commun du bloc de contact est centralisé dans les données du site.

## Spec

La revue a relevé deux points :

1. **Contenu dupliqué** : le titre et la promesse avocats apparaissaient dans deux pages. Ils sont maintenant définis dans `src/data/legal-offer.ts` et utilisés par l’accueil et la page avocats.
2. **Choix du service de formulaire** : la revue a signalé que le plan laissait ce choix ouvert. L’adaptateur Formspree est conservé comme option technique dormante, sans compte créé ni donnée transmise. La documentation précise désormais qu’il ne constitue pas une décision de mise en service et explique le changement à faire si un autre service est retenu.

La revue n’a identifié ni contenu confidentiel, ni chiffre ou client inventé, ni garantie non étayée. Les exports fournis sont distingués des connexions directes. Le schéma documentaire est explicitement fictif et pédagogique.

## Vérifications

- Vérification Astro/TypeScript et compilation statique des trois routes.
- 9 tests de la frontière de réception : acceptation explicite, refus, réseau, configuration absente, champs transmis, honeypot, réponse ambiguë, erreur HTTP et délai dépassé.
- 20 tests navigateur sur ordinateur et mobile : parcours public, liens internes, clavier, validation sans perte de saisie, préparation effective du mailto, fonctionnement sans JavaScript, reflow à 320 px avec texte à 200 %.
- 4 tests navigateur du service configuré, avec interception réseau : réception confirmée, réponse ambiguë, erreurs suivies d’une nouvelle tentative et double clic pendant l’envoi.
- Inspection visuelle des pages et du schéma à fort agrandissement. Correction du contraste d’un titre, de la hauteur du premier écran, de l’ordre du formulaire sur mobile et des débordements internes au schéma.

Les tests navigateur utilisent Chromium, y compris pour l’émulation mobile. Aucun envoi réel de demande n’a été effectué.

## Éléments à renseigner avant mise en service

Le contact actif prépare un email que le visiteur doit envoyer depuis sa messagerie. Il n’affiche aucun accusé de réception.

L’envoi direct nécessite le choix et la configuration d’un service réel, puis un essai contrôlé jusqu’à réception effective. Les informations de confidentialité devront correspondre à ce service. Le domaine définitif, l’identité juridique exacte et les pages légales restent à renseigner avant publication publique. Aucun déploiement n’a été effectué ; le projet Sites existant est conservé.

**Bilan des axes :** Standards, 2 observations corrigées, principale observation initiale : duplication de l’état du formulaire. Spec, 1 duplication corrigée et 1 choix d’activation clarifié, principal point restant : configurer le service réel avant d’activer l’envoi direct.
