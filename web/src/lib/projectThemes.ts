// web/src/lib/projectThemes.ts

export type ProjectTheme = {
  accent: string;
  accentMuted: string;
  logo?: string;
  logoAlt?: string;
};

const themes: Record<string, ProjectTheme> = {
  dingetje: {
    accent: '#f97316',
    accentMuted: 'rgba(249,115,22,0.12)',
    logo: '/projects/dingetje-logo.png',
    logoAlt: 'Dingetje logo',
  },
  folio: {
    accent: '#6366f1',
    accentMuted: 'rgba(99,102,241,0.12)',
    logo: '/projects/folio-logo.png',
    logoAlt: 'Folio logo',
  },
};

const fallback: ProjectTheme = {
  accent: '#d5147b',
  accentMuted: 'rgba(213,20,123,0.12)',
};

export function getProjectTheme(slug: string): ProjectTheme {
  return themes[slug] ?? fallback;
}
