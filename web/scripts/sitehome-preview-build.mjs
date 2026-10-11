import { spawn } from 'node:child_process';

// Only this dedicated test build command changes the process environment.
// Existing production scripts, files, tokens and Vercel projects are untouched.
const child = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    SITEHOME_TEST_PREVIEW: 'true',
    SITEHOME_ISOLATED_PREVIEW: 'true',
    NEXT_PUBLIC_SANITY_PROJECT_ID: 'ek05qcgq',
    NEXT_PUBLIC_SANITY_DATASET: 'sitehome-test',
    SANITY_STUDIO_PROJECT_ID: 'ek05qcgq',
    SANITY_STUDIO_DATASET: 'sitehome-test',
    SANITY_USE_CDN: 'false',
    SANITY_API_READ_TOKEN: '',
    SANITY_REVALIDATE_SECRET: '',
  },
});
child.on('error', () => { console.error('Unable to start the test preview build'); process.exit(1); });
child.on('exit', code => process.exit(code ?? 1));
