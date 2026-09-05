export const contactEmail = 'contact@allgates.net';

export const site = {
  name: 'Allgates',
  legalName: 'Allgates Sàrl',
  descriptor: 'Ingénierie logicielle en Suisse',
  description:
    'Allgates conçoit des applications métier, des automatisations et des intégrations de l’IA adaptées aux petites structures.',
  contactEmail,
} as const;

export const legalCompany = {
  name: site.legalName,
  address: ['Route de Saint-Cergue 42', '1270 Trélex', 'Suisse'],
  uid: 'CHE-114.036.884',
  commercialRegisterNumber: 'CH-550.1.053.210-8',
  commercialRegister: 'Registre du commerce du canton de Vaud',
} as const;

export const navigation = [
  { label: 'Accueil', href: '/' },
  { label: 'Archives pour avocats', href: '/avocats/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const competencies = [
  {
    title: 'Applications métier',
    description:
      'Concevoir un outil autour de vos processus, de vos données et des personnes qui l’utilisent.',
  },
  {
    title: 'Automatisation et IA',
    description:
      'Relier les bons systèmes, automatiser les tâches répétitives et intégrer l’IA là où elle apporte une aide concrète.',
  },
  {
    title: 'Mise en service et évolution',
    description:
      'Déployer un logiciel utilisable, accompagner sa prise en main et le faire évoluer avec votre activité.',
  },
] as const;

export const method = [
  {
    title: 'Comprendre le travail réel',
    description:
      'Nous partons de vos opérations, de vos contraintes et des outils déjà en place.',
  },
  {
    title: 'Délimiter l’intervention',
    description:
      'Le périmètre, les données mobilisées et le livrable sont définis avant engagement.',
  },
  {
    title: 'Livrer dans votre environnement',
    description:
      'La solution est mise en service avec les intégrations utiles et une prise en main claire.',
  },
  {
    title: 'Faire évoluer l’outil',
    description:
      'Les retours d’usage guident les ajustements et les développements suivants.',
  },
] as const;

export const credibility = [
  'Un interlocuteur technique senior, du cadrage aux évolutions',
  'Architecture, développement et mise en service réunis dans une même intervention',
  'Allgates Sàrl, société établie dans le canton de Vaud',
] as const;

export const contactCta = {
  title: 'Partons du problème à résoudre.',
  description:
    'Décrivez-nous votre contexte et le résultat recherché. Nous vous répondrons pour préciser la prochaine étape.',
} as const;
