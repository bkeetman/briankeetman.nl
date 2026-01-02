const getEnv = (name: string, fallback?: string) => {
  const value =
    process.env[name] ||
    process.env[name.replace('NEXT_PUBLIC_', 'SANITY_STUDIO_')];
  if (value) return value;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required environment variable: ${name}`);
};

export const projectId = getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', 'fzn0qzqj');
export const dataset = getEnv('NEXT_PUBLIC_SANITY_DATASET', 'production');
