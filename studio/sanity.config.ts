import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { BrandLayout, BrandLogo, BrandNavbar, BrandToolMenu } from './branding';
import { dataset, projectId } from './sanity.env';
import { schemaTypes } from './schemaTypes';

const title = 'briankeetman.nl';

export default defineConfig({
  name: 'default',
  title,
  basePath: '/',
  projectId,
  dataset,
  studio: {
    components: {
      logo: BrandLogo,
      navbar: BrandNavbar,
      layout: BrandLayout,
      toolMenu: BrandToolMenu,
    },
  },
  plugins: [
    codeInput(),
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
