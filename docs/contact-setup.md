# Réception du formulaire de contact

Le site fonctionne sans service externe configuré. Dans cet état, le bouton **Préparer mon email** ouvre la messagerie du visiteur avec un message adressé à `contact@allgates.net`. Le visiteur doit encore l’envoyer depuis sa messagerie et le site n’affiche aucune confirmation de réception.

## Option d’envoi direct avec Formspree

Un adaptateur Formspree est fourni comme option pour l’envoi direct depuis le site statique. Le choix du service de réception reste ouvert : aucun compte, formulaire ou destinataire n’a été créé chez ce fournisseur pendant l’implémentation, et aucune donnée ne lui est transmise tant que l’option n’est pas configurée.

Si cette option est retenue, suivre les étapes ci-dessous. Un autre service nécessitera d’adapter le contrat de réception dans `src/lib/contact.ts` et la validation de son adresse dans `src/pages/contact.astro`. Les informations de confidentialité devront correspondre au service effectivement retenu avant son activation publique.

1. Créer un formulaire dans Formspree et définir `contact@allgates.net` comme destinataire.
2. Vérifier l’adresse destinataire depuis le compte Formspree.
3. Relever l’endpoint public au format `https://formspree.io/f/identifiant`.
4. Définir `PUBLIC_CONTACT_FORM_ENDPOINT` dans l’environnement de compilation ou dans un fichier `.env` local non versionné.
5. Compiler le site et effectuer un envoi manuel contrôlé. Vérifier à la fois la confirmation dans la page et la présence de la demande dans Formspree ou dans la boîte destinataire.

Le navigateur envoie les champs `email`, `structure`, `nom`, `besoin` et `_gotcha`. Aucun fichier n’est accepté. `_gotcha` est le honeypot reconnu par Formspree. Le bouton est désactivé pendant l’envoi et la requête est interrompue après 15 secondes.

## Contrat de confirmation

Le site confirme la réception uniquement lorsque la réponse possède les deux caractéristiques suivantes :

- un statut HTTP réussi ;
- un corps JSON contenant la propriété `next` sous forme de chaîne, qui est le format de succès reconnu par le client officiel Formspree.

Une erreur HTTP, un autre corps de réponse, une panne réseau ou un dépassement du délai conserve les champs saisis et affiche un échec. Un honeypot rempli est refusé localement et ne produit aucune confirmation.

Références officielles :

- [Envoi AJAX avec Formspree](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax)
- [Honeypot `_gotcha`](https://help.formspree.io/fr/articles/building-your-form/honeypot-spam-filtering)
- [Détection du format de succès dans le client officiel](https://github.com/formspree/formspree-js/blob/main/packages/formspree-core/src/submission.ts#L26-L32)
- [Traitement de la réponse dans le client officiel](https://github.com/formspree/formspree-js/blob/main/packages/formspree-core/src/core.ts#L66-L107)

Les tests de la frontière de réception et du parcours navigateur n’appellent jamais Formspree. Le parcours navigateur compile une version isolée du site et intercepte l’endpoint externe :

```sh
npm run test:contact
npm run test:e2e:service
```
