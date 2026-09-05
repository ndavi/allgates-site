export const contactEmail = 'contact@allgates.net';

export const site = {
  name: 'Allgates',
  descriptor: 'Ingénierie logicielle en Suisse',
  description:
    'Allgates conçoit des applications métier, des automatisations et des intégrations de l’IA adaptées aux petites structures.',
  contactEmail,
} as const;

export const navigation = [
  { label: 'Accueil', href: '/' },
  { label: 'Solutions pour avocats', href: '/avocats/' },
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
  'Une expérience senior de la conception à la mise en service',
  'La maîtrise de projets métier et de systèmes complexes',
  'Une société suisse, engagée dans un échange direct et précis',
] as const;

export const contactCta = {
  title: 'Votre besoin mérite un outil précis.',
  description:
    'Décrivez-nous votre contexte. Un premier échange permet de clarifier le besoin et de cadrer une intervention avant devis.',
} as const;
