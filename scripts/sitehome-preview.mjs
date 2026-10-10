import { spawn } from 'node:child_process';
// Process-scoped overrides preserve existing .env files and production defaults.
const command = process.argv[2] ?? 'dev';
const isolated = process.argv.includes('--isolated');
const projectId = isolated ? 'ek05qcgq' : 'fzn0qzqj';
if (!['dev', 'build', 'start'].includes(command)) throw new Error('Unsupported preview command');
const child = spawn('npm', ['run', command, ...(command === 'dev' ? ['--', '--port', isolated ? '3101' : '3100'] : [])], {
  cwd: new URL('../web/', import.meta.url),
  stdio: 'inherit',
  env: {
    ...process.env,
    SITEHOME_TEST_PREVIEW: 'true',
    SITEHOME_ISOLATED_PREVIEW: isolated ? 'true' : 'false',
    NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
    NEXT_PUBLIC_SANITY_DATASET: 'sitehome-test',
    SANITY_STUDIO_PROJECT_ID: projectId,
    SANITY_STUDIO_DATASET: 'sitehome-test',
    SANITY_USE_CDN: 'false',
    SANITY_API_READ_TOKEN: process.env.SITEHOME_SANITY_READ_TOKEN ?? '',
    SANITY_REVALIDATE_SECRET: '',
  },
});
child.on('exit', code => process.exit(code ?? 1));
