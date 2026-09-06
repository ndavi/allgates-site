# Allgates

Site de présentation Astro en français, consacré à une offre unique de recherche documentaire pour les cabinets d’avocats de Suisse romande : accueil, plateforme et prise de contact.

## Développement

Node.js 22.12 ou supérieur est nécessaire.

```sh
npm ci
npm run dev -- --background
```

Utiliser l’adresse locale affichée par Astro. Le serveur reste en arrière-plan :

```sh
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

## Vérification

```sh
npm run check
npx playwright install chromium
npm test
```

Les tests du contact vérifient la frontière avec le service de réception. Les tests Playwright parcourent le site compilé sur ordinateur et mobile. Ils utilisent des serveurs de prévisualisation temporaires sur les ports 4322 et 4323 et ne transmettent aucune demande réelle. Le second serveur utilise une compilation séparée dans `.contact-test-dist/` et intercepte les réponses du service externe pour vérifier les confirmations, les erreurs et les nouvelles tentatives.

```sh
npm run test:contact
npm run test:e2e
npm run test:e2e:service
npm run build
```

## Contenu et configuration

- `src/data/site.ts` : marque, coordonnées, navigation et contenu général.
- `src/data/legal-offer.ts` : sources, étapes et cadre de déploiement de la plateforme.
- `src/layouts/SiteLayout.astro` et `src/styles/global.css` : éléments partagés et identité visuelle.
- `docs/plan-site-allgates.md` : spécification d’origine.
- `docs/contact-setup.md` : configuration et vérification du contact.

L’adresse confirmée est **contact@allgates.net**. Sans service de formulaire configuré, le formulaire prépare un email dans la messagerie du visiteur ; celui-ci doit l’envoyer lui-même. Le site ne confirme jamais une réception dans ce mode.

Le cabinet indique les informations qui l’intéressent. Allgates les recherche dans les archives convenues, les extrait et les regroupe, puis livre une application contenant les résultats et leurs sources. Le cabinet consulte les informations déjà préparées. L’hébergement, les accès et les modalités de traitement sont définis avec chaque cabinet.

Le parcours commence par une prise de contact pour préciser les besoins et les archives disponibles. Le site ne propose pas de démonstration : l’application n’est pas encore disponible. Un premier travail sur un dossier réel peut être convenu avec un prix et un délai définis ; son coût est déduit du déploiement si le projet se poursuit. Le cabinet évalue les informations préparées et leurs sources.

L’utilisateur a confirmé le caractère familial de l’entreprise et ses vingt ans d’existence, sans revendiquer vingt ans de spécialisation dans cette offre. L’accueil présente les capacités de recherche et le cadrage avec le cabinet, sans scénario fictif présupposant son besoin. Aucun contenu de dossier confidentiel n’est utilisé.

## Publication

Le projet Sites existant est conservé dans `.openai/hosting.json`. La sortie statique se trouve dans `dist/`. L’implémentation ne fixe pas l’hébergement public définitif.

Avant une publication publique, renseigner le domaine définitif, l’identité juridique et les mentions adaptées au fonctionnement effectivement retenu. Pour recevoir les demandes directement depuis le site, configurer puis vérifier le service décrit dans `docs/contact-setup.md`.
