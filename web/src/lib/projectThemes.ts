export type ProjectTheme = {
  accent: string;
  accentMuted: string;
  cardBg: string;
  fontFamily: string;
  textMuted: string;
  logo?: string;
  logoAlt?: string;
};

const themes: Record<string, ProjectTheme> = {
  dingetje: {
    accent: '#f97316',
    accentMuted: 'rgba(249,115,22,0.12)',
    cardBg: '#1e1008',
    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
    textMuted: 'rgba(255,255,255,0.55)',
    logo: '/projects/dingetje-logo.png',
    logoAlt: 'Dingetje logo',
  },
  folio: {
    accent: '#6366f1',
    accentMuted: 'rgba(99,102,241,0.12)',
    cardBg: '#141627',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    textMuted: 'rgba(255,255,255,0.50)',
    logo: '/projects/folio-logo.png',
    logoAlt: 'Folio logo',
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
