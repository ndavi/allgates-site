export const contactEmail = 'contact@allgates.net';

export const site = {
  name: 'Allgates',
  legalName: 'Allgates Sàrl',
  descriptor: 'Recherche documentaire pour cabinets d’avocats',
  description:
    'Allgates extrait et regroupe les informations utiles aux cabinets d’avocats de Suisse romande dans une application avec un accès aux documents et échanges d’origine.',
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
  { label: 'La plateforme', href: '/avocats/' },
  { label: 'Contactez-nous', href: '/contact/' },
] as const;

export const benefits = [
  {
    title: 'Consulter les informations regroupées',
    description:
      'Les informations que vous nous demandez sont extraites de vos archives et regroupées dans votre application.',
  },
  {
    title: 'Consulter les échanges associés',
    description:
      'Consultez les emails liés à une pièce, leurs dates et leurs auteurs lorsque ces informations figurent dans les archives.',
  },
  {
    title: 'Accéder aux documents d’origine',
    description:
      'Chaque résultat renvoie au document ou à l’échange dont il provient. Vous pouvez ouvrir la source pour vérifier son contenu.',
  },
] as const;

export const method = [
  {
    title: 'Premier échange',
    description:
      'Décrivez les informations qui vous intéressent et les archives disponibles, sans transmettre de documents du cabinet à ce stade.',
  },
  {
    title: 'Pilote sur un dossier réel',
    description:
      'Nous définissons les archives à traiter, les informations à extraire, le prix et le délai. Le coût de ce premier travail est déduit du déploiement si vous poursuivez le projet.',
  },
  {
    title: 'Évaluation avec votre équipe',
    description:
      'Votre équipe consulte les informations extraites et regroupées, vérifie leurs sources et nous indique si elles répondent aux questions posées.',
  },
  {
    title: 'Déploiement au cabinet',
    description:
      'Si vous poursuivez le projet, nous préparons les informations issues des archives supplémentaires convenues avec vous et les intégrons à votre application.',
  },
] as const;

export const credibility = [
  'Plus de dix ans d’expérience en développement logiciel',
  'Une entreprise familiale ancrée en Suisse romande depuis vingt ans',
  'Des missions de plusieurs années pour EDF et l’ONU',
  'Allgates Sàrl, société établie dans le canton de Vaud',
] as const;

export const contactCta = {
  description:
    'Contactez-nous pour discuter de votre dossier et des informations que vous recherchez.',
} as const;
