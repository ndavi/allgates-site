export const legalOffer = {
	headline: 'Retrouvez rapidement les informations utiles dans vos archives.',
} as const;

export const sourceTypes = [
	{
		title: 'Messageries',
		text: 'Fichiers PST et autres exports de messagerie, avec leurs messages et pièces jointes.',
	},
	{
		title: 'Documents',
		text: 'PDF, documents bureautiques, images et dossiers transmis avec leur contexte.',
	},
	{
		title: 'Espaces documentaires',
		text: 'Exports SharePoint, OneDrive ou d’autres espaces, avec l’arborescence et les métadonnées disponibles.',
	},
] as const;

export const offerSteps = [
	{
		title: 'Diagnostiquer le corpus',
		text: 'Examiner les formats, le volume disponible et les questions à traiter afin de définir une intervention adaptée.',
	},
	{
		title: 'Préparer et rechercher',
		text: 'Extraire et indexer les contenus, appliquer l’OCR lorsque nécessaire, repérer les doublons et rapprocher les éléments utiles.',
	},
	{
		title: 'Restituer dans le format utile',
		text: 'Remettre une synthèse, un rapport, un corpus consultable ou un outil de recherche, selon ce qui a été défini au diagnostic.',
	},
] as const;

export const interventionFramework = [
	'Les formats, le volume et les questions à traiter sont vérifiés lors du diagnostic.',
	'La forme de la restitution et les moyens de revenir aux sources sont convenus avant l’intervention.',
	'Les accès et les modalités de traitement sont définis avec le cabinet.',
] as const;
