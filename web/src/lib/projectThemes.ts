export type ProjectTheme = {
  accent: string;
  accentMuted: string;
  cardBg: string;
  fontFamily: string;
  textMuted: string;
  logo?: string;
  logoAlt?: string;
  /** Local screenshot that overrides the Sanity mainImage as preview. */
  preview?: string;
  appScreenshots?: { src: string; alt: string }[];
  appBackground?: string;
};

const themes: Record<string, ProjectTheme> = {
  oddfellows: {
    accent: '#d4b761',
    accentMuted: 'rgba(212,183,97,0.15)',
    cardBg: '#14233d',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    textMuted: '#c4cfdf',
    logo: '/projects/oddfellows-logo.png',
    logoAlt: 'OddFellows.app logo met drie verbonden schakels',
    appScreenshots: [
      { src: '/projects/oddfellows-app-start.jpg', alt: 'OddFellows.app: startscherm met lidkaart en komende activiteiten' },
      { src: '/projects/oddfellows-app-agenda.jpg', alt: 'OddFellows.app: agenda met bijeenkomsten en activiteiten' },
    ],
  },
  dingetje: {
    accent: '#7c3aed',
    accentMuted: 'rgba(124,58,237,0.15)',
    cardBg: '#1a0d26',
    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
    textMuted: '#a3a3a3',
    logo: '/projects/dingetje-icon.png',
    logoAlt: 'Dingetje logo',
    preview: '/projects/dingetje-preview.jpg',
    appBackground: '#240d3b',
    appScreenshots: [
      { src: '/projects/dingetje-app-maken.jpg', alt: 'Dingetje: een bijeenkomst maken met datum, locatie en optionele tickets' },
      { src: '/projects/dingetje-app-uitnodiging.jpg', alt: 'Dingetje: uitnodiging voor een bijeenkomst met reacties van gasten' },
    ],
  },
  folio: {
    accent: '#ea580c',
    accentMuted: 'rgba(234,88,12,0.12)',
    cardBg: '#111418',
    fontFamily: '"SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    textMuted: '#8b949e',
    logo: '/projects/folio-logo.png',
    logoAlt: 'Folio logo',
  },
  sitehome: {
    accent: '#fafafa',
    accentMuted: 'rgba(250,250,250,0.10)',
    cardBg: '#171717',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    textMuted: '#aaaaaa',
    logo: '/projects/sitehome-logo.png',
    logoAlt: 'SiteHome logo',
    preview: '/projects/sitehome-preview.jpg',
  },
};

const fallback: ProjectTheme = {
  accent: '#d5147b',
  accentMuted: 'rgba(213,20,123,0.12)',
  cardBg: '#2a2a2a',
  fontFamily: 'var(--font-inter), system-ui, sans-serif',
  textMuted: 'rgba(255,255,255,0.50)',
};

export function getProjectTheme(slug: string): ProjectTheme {
  return themes[slug] ?? fallback;
}
