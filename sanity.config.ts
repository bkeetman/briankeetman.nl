import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { dataset, projectId } from './src/sanity/lib/env';
import { schemaTypes } from './src/sanity/schemaTypes';

const title = 'briankeetman.nl';

export default defineConfig({
  name: 'default',
  title,
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    codeInput(),
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
