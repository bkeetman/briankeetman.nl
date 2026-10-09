import { spawn } from 'node:child_process';
// Process-scoped overrides preserve existing .env files and production defaults.
const command = process.argv[2] ?? 'dev';
if (!['dev', 'build', 'start'].includes(command)) throw new Error('Unsupported preview command');
const child = spawn('npm', ['run', command, ...(command === 'dev' ? ['--', '--port', '3100'] : [])], {
  cwd: new URL('../web/', import.meta.url),
  stdio: 'inherit',
  env: {
    ...process.env,
    SITEHOME_TEST_PREVIEW: 'true',
    NEXT_PUBLIC_SANITY_PROJECT_ID: 'fzn0qzqj',
    NEXT_PUBLIC_SANITY_DATASET: 'sitehome-test',
    SANITY_STUDIO_PROJECT_ID: 'fzn0qzqj',
    SANITY_STUDIO_DATASET: 'sitehome-test',
    SANITY_USE_CDN: 'false',
    SANITY_API_READ_TOKEN: process.env.SITEHOME_SANITY_READ_TOKEN ?? '',
    SANITY_REVALIDATE_SECRET: '',
  },
});
child.on('exit', code => process.exit(code ?? 1));
