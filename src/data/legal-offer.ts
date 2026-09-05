export const legalOffer = {
	headline: 'Retrouvez les pièces qui comptent dans vos dossiers.',
	summary: 'Allgates aide votre cabinet à rassembler ses archives emails et documentaires dans un corpus consultable, afin de rechercher les contenus, rapprocher les fichiers et revenir aux sources.',
} as const;

export const sourceTypes = [
	{
		title: 'Archives de messagerie',
		text: 'Les archives PST fournies peuvent être intégrées à la préparation du corpus.',
	},
	{
		title: 'Exports documentaires',
		text: 'Les exports SharePoint ou OneDrive fournis peuvent être préparés et indexés.',
	},
	{
		title: 'Pièces et dossiers',
		text: 'Les fichiers remis avec leur contexte disponible peuvent être intégrés au périmètre convenu.',
	},
] as const;

export const offerSteps = [
	{
		title: 'Préparer le corpus',
		text: 'Qualifier les sources, extraire les contenus, repérer les doublons, appliquer l’OCR lorsque nécessaire et indexer les éléments du périmètre retenu.',
	},
	{
		title: 'Examiner les rapprochements utiles',
		text: 'Rechercher dans les contenus, relier messages et pièces jointes, puis reconstituer des échanges à partir des éléments disponibles.',
	},
	{
		title: 'Restituer avec les sources',
		text: 'Présenter les résultats de façon exploitable, en gardant le lien avec les documents et messages qui les étayent.',
	},
] as const;

export const deliverables = [
	{
		title: 'État du corpus',
		text: 'Une vision des données examinées et des limites observées.',
	},
	{
		title: 'Résultats sourcés',
		text: 'Des recherches ou rapprochements accompagnés de leur origine consultable.',
	},
	{
		title: 'Restitution à définir',
		text: 'Rapport, corpus consultable, outil de recherche ou combinaison adaptée : les éléments sont composés selon la mission et précisés au cadrage.',
	},
] as const;

export const analysisLimits = [
	'Une empreinte rapproche des copies au contenu binaire identique ; une modification de contenu la change normalement.',
	'Les métadonnées et horodatages sont des indices. Leur origine et leurs limites doivent rester visibles ; ils ne certifient pas l’identité réelle de l’auteur.',
	'Les occurrences et éléments de contexte peuvent éclairer une circulation documentaire ; une correspondance seule ne démontre pas une exfiltration.',
	'Les éléments encore présents dans les archives peuvent être examinés ; la récupération d’effacements définitifs ne peut pas être présumée.',
	'Les résultats aident l’analyse du cabinet. Leur force probante relève de l’appréciation juridique et du contexte du dossier.',
] as const;
