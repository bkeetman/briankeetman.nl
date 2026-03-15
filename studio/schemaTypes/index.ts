import type { SchemaTypeDefinition } from 'sanity';

import { blockContent } from './objects/blockContent';
import { portfolio } from './documents/portfolio';
import { project } from './documents/project';
import { post } from './documents/post';

export const schemaTypes = [post, portfolio, project, blockContent] satisfies SchemaTypeDefinition[];
