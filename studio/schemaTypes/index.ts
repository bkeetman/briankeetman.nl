import type { SchemaTypeDefinition } from 'sanity';

import { blockContent } from './objects/blockContent';
import { portfolio } from './documents/portfolio';
import { post } from './documents/post';

export const schemaTypes = [post, portfolio, blockContent] satisfies SchemaTypeDefinition[];
