export const contactEmail = 'contact@allgates.net';

export const site = {
  name: 'Allgates',
  legalName: 'Allgates Sàrl',
  descriptor: 'Recherche documentaire pour cabinets d’avocats',
  description:
    'Allgates recherche les pièces et échanges utiles à votre dossier et réunit les résultats dans une application avec leurs sources, pour les cabinets d’avocats de Suisse romande.',
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
    title: 'Parlons de votre besoin',
    description: 'Vous nous décrivez les informations recherchées et les archives disponibles, sans transmettre de documents confidentiels à ce stade.',
  },
  {
    title: 'Convenons du travail à réaliser',
    description: 'Nous définissons ensemble les archives à traiter, les résultats attendus, le prix et le délai. Les modalités de traitement et d’accès aux données sont précisées avant de commencer.',
  },
  {
    title: 'Consultez les résultats',
    description: 'Nous vous livrons une application contenant les informations préparées et leurs sources. Votre équipe peut les examiner et nous faire part de ses retours.',
  },
] as const;

export const credibility = [
  'Plus de dix ans d’expérience en développement logiciel',
  'Une entreprise familiale ancrée en Suisse romande depuis vingt ans',
  'Allgates Sàrl, société établie dans le canton de Vaud',
] as const;

export const contactCta = {
  title: 'Parlons de votre dossier.',
  description:
    'Un premier échange permet de comprendre votre besoin et de convenir du travail à réaliser.',
} as const;
