// https://llmstxthub.com/guides/getting-started-llms-txt
import type { APIRoute } from 'astro';
import { readdir } from 'fs/promises';
import { createReadStream } from 'fs';

/**
 * [title, path]
 */
type Link = [string, string];
type FileInfo = {
  name: string;
  path: string;
};

const title = 'Drizzle';
const description = 'Drizzle is a modern TypeScript ORM developers wanna use in their next project. It is lightweight at only ~7.4kb minified+gzipped, and it\'s tree shakeable with exactly 0 dependencies. It supports every PostgreSQL, MySQL, SQLite and SingleStore database and is serverless-ready by design.';
const docsContentDir = `${process.cwd()}/src/content/docs`;

function mapFileNames(files: string[]) {
  return files.map((file): FileInfo => ({
    name: `${file}.mdx`,
    path: docsContentDir
  }));
}

async function getFilesFromDir(dirs: string | string[]) {
  const filesPromises = (Array.isArray(dirs) ? dirs : [dirs]).map(async (dir) => await readdir(dir, {
    withFileTypes: true
  }));
  const files = await Promise.all(filesPromises);
  return files.flat().filter((file) => file.name.endsWith('.mdx'));
}

async function generateSection(
  url: URL,
  subheader: string | null,
  files: FileInfo[],
  basePath: string,
  getTitleBy: 'frontmatter' | 'content'
) {
  const linksPromises = files
    .map(async (file) => {
      const stream = createReadStream(`${file.path}/${file.name}`, {
        encoding: 'utf-8',
        highWaterMark: 1800 // Reads 1,800 bytes at a time (30~ lines). Should be enough to get the markdown file's h1
      });
      let title: string | null = null;
      const path = `${basePath}/${file.name.slice(0, -4)}`;

      for await (const chunk_ of stream.iterator({ destroyOnReturn: true })) {
        const chunk = chunk_ as string;
        if (chunk.length === 0) continue;

        const match = chunk.match(getTitleBy === 'content' ? /#+(.*)/ : /title:(.*)/) ?? [];
        if (match.length > 0) {
          title = match[1].trim();

          if (title.startsWith('"') && title.endsWith('"')) {
            title = title.slice(1, -1);
          }
          break;
        }
      }

      return !title ? null : [title, path] as Link;
    });
  const links = await Promise.all(linksPromises);
  const linksStr = links
    .filter((link) => link !== null)
    .map(([title, path]) => `- [${title}](${url.origin}${path})`)
    .join('\n');

  const subheaderStr = subheader ? `\n\n## ${subheader}\n\n` : '\n';
  return `${subheaderStr}${linksStr}`;
}

export const GET: APIRoute = async ({ url }) => {
  let llms = `# ${title}\n\n> ${description}`;
  let files: FileInfo[] = [];

  files = await getFilesFromDir(`${docsContentDir}/get-started`);
  llms += await generateSection(url, 'Getting started', files, '/docs/get-started', 'content');

  files = await getFilesFromDir(`${docsContentDir}/guides`);
  llms += await generateSection(url, 'Guides', files, '/docs/guides', 'frontmatter');

  files = await getFilesFromDir([
    `${docsContentDir}/tutorials/drizzle-on-the-edge`,
    `${docsContentDir}/tutorials/drizzle-with-db`,
    `${docsContentDir}/tutorials/drizzle-with-frameworks`,
  ]);
  llms += await generateSection(url, 'Tutorials', files, '/docs/tutorials', 'frontmatter');

  files = mapFileNames([
    'sql-schema-declaration',
    'connect-overview',
    'data-querying',
    'migrations',
  ]);
  llms += await generateSection(url, 'Fundamentals', files, '/docs', 'content');

  files = mapFileNames([
    'get-started-postgresql',
    'get-started-mysql',
    'get-started-sqlite',
    'connect-drizzle-proxy',
    /* --- */
    'get-started-singlestore',
    'connect-neon',
    'connect-vercel-postgres',
    'connect-supabase',
    'connect-xata',
    'connect-pglite',
    'connect-nile',
    'connect-aws-data-api-pg',
    /* --- */
    'connect-planetscale',
    'connect-tidb',
    'connect-aws-data-api-mysql',
    /* --- */
    'connect-turso',
    'connect-cloudflare-d1',
    'connect-bun-sqlite',
    'connect-cloudflare-do',
    'connect-expo-sqlite',
    'connect-op-sqlite',
    'connect-react-native-sqlite',
  ]);
  llms += await generateSection(url, 'Connect to a database', files, '/docs', 'content');

  files = await getFilesFromDir(`${docsContentDir}/column-types`);
  llms += await generateSection(url, 'Manage schema', files, '/docs/column-types', 'frontmatter');
  files = mapFileNames([
    'indexes-constraints',
    'sequences',
    'views',
    'schemas',
    'rls'
  ]);
  llms += await generateSection(url, null, files, '/docs', 'content');
  files = await getFilesFromDir(`${docsContentDir}/extensions`);
  llms += await generateSection(url, null, files, '/docs/extensions', 'frontmatter');

  files = mapFileNames([
    'kit-overview',
    'drizzle-kit-generate',
    'drizzle-kit-migrate',
    'drizzle-kit-push',
    'drizzle-kit-pull',
    'drizzle-kit-export',
    'drizzle-kit-check',
    'drizzle-kit-up',
    'drizzle-kit-studio',
    'kit-custom-migrations',
    'kit-migrations-for-teams',
    'kit-web-mobile',
    'drizzle-config-file',
  ]);
  llms += await generateSection(url, 'Migrations', files, '/docs', 'content');

  files = mapFileNames([
    'seed-overview',
    'seed-functions',
    'seed-versioning',
  ]);
  llms += await generateSection(url, 'Seeding', files, '/docs', 'content');

  files = mapFileNames([
    'rqb',
    'select',
    'insert',
    'update',
    'delete',
    'operators',
    'query-utils',
    'joins',
    'sql'
  ]);
  llms += await generateSection(url, 'Access your data', files, '/docs', 'content');

  files = mapFileNames([
    'perf-queries',
    'perf-serverless'
  ]);
  llms += await generateSection(url, 'Performance', files, '/docs', 'content');

  files = mapFileNames([
    'prisma',
    'eslint-plugin',
    'zod',
    'typebox',
    'valibot',
    'graphql'
  ]);
  llms += await generateSection(url, 'Extensions, integrations and plugins', files, '/docs', 'content');

  return new Response(llms);
};
