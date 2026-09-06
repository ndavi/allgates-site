export const contactEmail = 'contact@allgates.net';

export const site = {
  name: 'Allgates',
  legalName: 'Allgates Sàrl',
  descriptor: 'Ingénierie logicielle en Suisse',
  description:
    'Allgates accompagne les entreprises et cabinets d’avocats de Suisse romande avec du logiciel sur mesure, de l’automatisation, de l’audit et du conseil IT.',
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
    title: 'Logiciels sur mesure',
    description:
      'Concevoir un outil adapté à vos processus, à vos données et aux personnes qui l’utilisent au quotidien.',
  },
  {
    title: 'Automatisation ciblée',
    description:
      'Relier les systèmes existants et automatiser les recherches, saisies, contrôles ou relances qui ralentissent le travail. L’IA peut être intégrée en arrière-plan lorsqu’elle apporte une aide concrète.',
  },
  {
    title: 'Recherche d’informations',
    description:
      'Rassembler des données dispersées et construire un accès rapide aux informations utiles à une décision ou à un dossier.',
  },
  {
    title: 'Audit et conseil IT',
    description:
      'Clarifier une situation technique, identifier les risques et définir une trajectoire réaliste avant d’investir dans une solution.',
  },
] as const;

export const method = [
  {
    title: 'Premier échange gratuit',
    description:
      'Nous échangeons sur votre fonctionnement actuel, la difficulté rencontrée et le résultat que vous recherchez.',
  },
  {
    title: 'Diagnostic et proposition',
    description:
      'Lorsque le besoin le justifie, un diagnostic permet de préciser le périmètre, l’intervention et le devis.',
  },
  {
    title: 'Réalisation et mise en service',
    description:
      'La solution est construite avec les intégrations utiles, puis mise en service dans votre environnement.',
  },
  {
    title: 'Suivi et évolution',
    description:
      'Les retours d’usage guident les ajustements et les évolutions qui apportent une valeur concrète.',
  },
] as const;

export const credibility = [
  'Plus de dix ans d’expérience en développement logiciel',
  'Vingt ans d’expérience dans des environnements de service exigeants',
  'Des parcours professionnels comprenant notamment des missions pluriannuelles pour EDF et l’ONU',
  'Allgates Sàrl, société établie dans le canton de Vaud',
] as const;

export const contactCta = {
  title: 'Échangeons sur ce que vous voulez améliorer.',
  description:
    'Un premier échange gratuit permet de comprendre votre besoin et de déterminer si une intervention Allgates est pertinente.',
} as const;
