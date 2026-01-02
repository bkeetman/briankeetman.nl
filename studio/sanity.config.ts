import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { dataset, projectId } from './sanity.env';
import { schemaTypes } from './schemaTypes';

const title = 'briankeetman.nl';

export default defineConfig({
  name: 'default',
  title,
  basePath: '/',
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
