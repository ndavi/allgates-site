# Allgates

Site de présentation Astro en français : accueil, offre documentaire pour les cabinets d’avocats et contact.

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
- `src/data/legal-offer.ts` : sources, étapes, livrables et limites de l’offre avocats.
- `src/layouts/SiteLayout.astro` et `src/styles/global.css` : éléments partagés et identité visuelle.
- `docs/plan-site-allgates.md` : spécification d’origine.
- `docs/contact-setup.md` : configuration et vérification du contact.

L’adresse confirmée est **contact@allgates.net**. Sans service de formulaire configuré, le formulaire prépare un email dans la messagerie du visiteur ; celui-ci doit l’envoyer lui-même. Le site ne confirme jamais une réception dans ce mode.

Le traitement local de la chaîne documentaire a été confirmé pendant l’implémentation. Les formats exacts, les sources remises et les livrables sont précisés pour chaque mission. Aucun contenu de mission confidentielle n’est utilisé.

## Publication

Le projet Sites existant est conservé dans `.openai/hosting.json`. La sortie statique se trouve dans `dist/`. L’implémentation ne fixe pas l’hébergement public définitif.

Avant une publication publique, renseigner le domaine définitif, l’identité juridique et les mentions adaptées au fonctionnement effectivement retenu. Pour recevoir les demandes directement depuis le site, configurer puis vérifier le service décrit dans `docs/contact-setup.md`.
