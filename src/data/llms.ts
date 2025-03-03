import { readdir, readFile } from 'fs/promises';
import { createReadStream } from 'fs';

/**
 * [title, path]
 */
type Link = [string, string];
export type LlmsFile = {
  name: string;
  path: string;
};

export const title = 'Drizzle';
export const description = 'Drizzle is a modern TypeScript ORM developers wanna use in their next project. It is lightweight at only ~7.4kb minified+gzipped, and it\'s tree shakeable with exactly 0 dependencies. It supports every PostgreSQL, MySQL, SQLite and SingleStore database and is serverless-ready by design.';
const docsContentDir = `${process.cwd()}/src/content/docs`;

export function mapFileNames(files: string[]) {
  return files.map((file): LlmsFile => ({
    name: `${file}.mdx`,
    path: docsContentDir
  }));
}

export async function getFilesFromDir(dirs: string | string[]) {
  const filesPromises = (Array.isArray(dirs) ? dirs : [dirs]).map(async (dir) => await readdir(dir, {
    withFileTypes: true
  }));
  const files = await Promise.all(filesPromises);
  return files.flat().filter((file) => file.name.endsWith('.mdx'));
}

export async function generateSection(
  url: URL,
  subheader: string | null,
  files: LlmsFile[],
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

export async function generateFileContent(file: LlmsFile) {
  const content = await readFile(`${file.path}/${file.name}`, 'utf-8');
  return `\n\n---\n\n${content}`;
}

export const llmsFiles = {
  getStarted: () => getFilesFromDir(`${docsContentDir}/get-started`),
  guides: () => getFilesFromDir(`${docsContentDir}/guides`),
  tutorials: () => getFilesFromDir([
    `${docsContentDir}/tutorials/drizzle-on-the-edge`,
    `${docsContentDir}/tutorials/drizzle-with-db`,
    `${docsContentDir}/tutorials/drizzle-with-frameworks`,
  ]),
  fundamentals: () => mapFileNames([
    'sql-schema-declaration',
    'connect-overview',
    'data-querying',
    'migrations',
  ]),
  connect: () => mapFileNames([
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
  ]),
  schema: {
    types: () => getFilesFromDir(`${docsContentDir}/column-types`),
    extensions: () => getFilesFromDir(`${docsContentDir}/extensions`),
    other: () => mapFileNames([
      'indexes-constraints',
      'sequences',
      'views',
      'schemas',
      'rls'
    ])
  },
  migrations: () => mapFileNames([
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
  ]),
  seeding: () => mapFileNames([
    'seed-overview',
    'seed-functions',
    'seed-versioning',
  ]),
  data: () => mapFileNames([
    'rqb',
    'select',
    'insert',
    'update',
    'delete',
    'operators',
    'query-utils',
    'joins',
    'sql'
  ]),
  performance: () => mapFileNames([
    'perf-queries',
    'perf-serverless'
  ]),
  extensions: () => mapFileNames([
    'prisma',
    'eslint-plugin',
    'zod',
    'typebox',
    'valibot',
    'graphql'
  ])
}

export async function getAllFiles() {
  const promises: (() => Promise<LlmsFile[]>)[] = [];

  for (const v1 of Object.values(llmsFiles)) {
    if (typeof v1 === 'object') {
      for (const v2 of Object.values(v1)) {
        promises.push(v2 as any);
      }
    } else {
      promises.push(v1 as any);
    }
  }

  const resolved = await Promise.all(promises.map((fn) => fn()));
  return resolved.flat();
}
