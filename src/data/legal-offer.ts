export const legalOffer = {
	headline: 'Retrouvez les échanges et pièces utiles dans vos archives.',
	summary: 'Allgates prépare et indexe les exports fournis par votre cabinet, mène les recherches convenues et restitue chaque résultat avec un lien vers sa source.',
} as const;

export const sourceTypes = [
	{
		title: 'Archives de messagerie',
		text: 'Fichiers PST et autres exports de messagerie compatibles avec le périmètre convenu.',
	},
	{
		title: 'Exports documentaires',
		text: 'Exports SharePoint ou OneDrive, avec l’arborescence et les métadonnées disponibles.',
	},
	{
		title: 'Pièces et dossiers',
		text: 'Documents transmis avec les éléments de contexte nécessaires à leur interprétation.',
	},
] as const;

export const offerSteps = [
	{
		title: 'Préparer les données',
		text: 'Qualifier les formats, extraire les contenus, repérer les doublons, appliquer l’OCR lorsque nécessaire et dresser un état du corpus.',
	},
	{
		title: 'Répondre à une question précise',
		text: 'Rechercher dans les contenus, relier les messages à leurs pièces jointes et reconstituer les échanges utiles à l’analyse.',
	},
	{
		title: 'Remettre des résultats vérifiables',
		text: 'Fournir les résultats avec leur origine consultable, sous la forme convenue au cadrage : rapport, corpus consultable ou outil de recherche.',
	},
] as const;

export const analysisLimits = [
	'Les recherches portent sur les éléments présents dans les archives fournies ; une suppression définitive ne peut pas être récupérée par défaut.',
	'Les empreintes, métadonnées et horodatages sont des indices à interpréter dans leur contexte ; ils ne suffisent pas seuls à établir un fait.',
	'Les résultats restent liés à leurs sources ; leur portée juridique relève de l’analyse du cabinet et du contexte du dossier.',
] as const;
