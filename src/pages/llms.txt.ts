// https://llmstxthub.com/guides/getting-started-llms-txt
import { description, generateSection, llmsFiles, title, type LlmsFile } from '@/data/llms';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  let llms = `# ${title}\n\n> ${description}`;
  let files: LlmsFile[] = [];

  files = await llmsFiles.getStarted();
  llms += await generateSection(url, 'Getting started', files, '/docs/get-started', 'content');

  files = await llmsFiles.guides();
  llms += await generateSection(url, 'Guides', files, '/docs/guides', 'frontmatter');

  files = await llmsFiles.tutorials();
  llms += await generateSection(url, 'Tutorials', files, '/docs/tutorials', 'frontmatter');

  files = llmsFiles.fundamentals();
  llms += await generateSection(url, 'Fundamentals', files, '/docs', 'content');

  files = llmsFiles.connect();
  llms += await generateSection(url, 'Connect to a database', files, '/docs', 'content');

  files = await llmsFiles.schema.types();
  llms += await generateSection(url, 'Manage schema', files, '/docs/column-types', 'frontmatter');
  files = llmsFiles.schema.other();
  llms += await generateSection(url, null, files, '/docs', 'content');
  files = await llmsFiles.schema.extensions();
  llms += await generateSection(url, null, files, '/docs/extensions', 'frontmatter');

  files = llmsFiles.migrations();
  llms += await generateSection(url, 'Migrations', files, '/docs', 'content');

  files = llmsFiles.seeding();
  llms += await generateSection(url, 'Seeding', files, '/docs', 'content');

  files = llmsFiles.data();
  llms += await generateSection(url, 'Access your data', files, '/docs', 'content');

  files = llmsFiles.performance();
  llms += await generateSection(url, 'Performance', files, '/docs', 'content');

  files = llmsFiles.extensions();
  llms += await generateSection(url, 'Extensions, integrations and plugins', files, '/docs', 'content');

  return new Response(llms);
};
