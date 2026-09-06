export const legalOffer = {
	headline: 'Consultez les documents et échanges de votre dossier au même endroit, avec un accès direct aux sources.',
} as const;

export const sourceTypes = [
	{
		title: 'Messageries',
		text: 'Fichiers PST et autres exports de messagerie, avec leurs messages et pièces jointes.',
	},
	{
		title: 'Documents',
		text: 'PDF, documents bureautiques, images et documents scannés.',
	},
	{
		title: 'Espaces documentaires',
		text: 'Exports SharePoint, OneDrive ou d’autres espaces, avec l’arborescence et les métadonnées disponibles.',
	},
] as const;

export const offerSteps = [
	{
		title: 'Définir les informations à rechercher',
		text: 'Nous choisissons avec vous les archives à importer et les questions à traiter. Les formats, le volume et les modalités de transfert sont vérifiés avant de commencer.',
	},
	{
		title: 'Extraire et regrouper les informations',
		text: 'Nous recherchons dans vos archives les informations demandées par votre cabinet, puis nous les extrayons et les regroupons en conservant les liens vers les documents et échanges d’origine.',
	},
	{
		title: 'Consulter les résultats dans votre application',
		text: 'Nous vous livrons une application contenant les informations recherchées, déjà extraites et regroupées. Votre équipe consulte les résultats qui l’intéressent et accède aux documents d’origine.',
	},
] as const;

export const interventionFramework = [
	'Le lieu d’hébergement, les personnes autorisées et les modalités de traitement sont définis avec le cabinet.',
	'Les modalités de transfert, de conservation et de suppression des données sont convenues avant leur remise.',
	'Nous recherchons les informations dans les archives choisies avec votre cabinet.',
	'Chaque résultat renvoie à sa source. Votre cabinet évalue la pertinence des éléments retrouvés pour le dossier.',
] as const;
