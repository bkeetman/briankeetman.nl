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
    accent: '#7c3aed',
    accentMuted: 'rgba(124,58,237,0.15)',
    cardBg: '#1a0d26',
    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
    textMuted: '#a3a3a3',
    logo: '/projects/dingetje-logo.png',
    logoAlt: 'Dingetje logo',
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
