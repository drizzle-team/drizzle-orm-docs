export const docsDialectIds = [
  "pg",
  "mysql",
  "sqlite",
  "singlestore",
  "mssql",
  "cockroach",
] as const;

export type DocsDialectId = (typeof docsDialectIds)[number];

export const defaultDocsDialect: DocsDialectId = "pg";

export const dialectRelatedFolder = ["tutorials", "guides"] as const;

export const commonFolders = ["latest-releases", "get-started"] as const;
const docsDialectIdSet = new Set<string>(docsDialectIds);

export const isDocsDialectId = (value: string): value is DocsDialectId =>
  docsDialectIdSet.has(value);

const getStartedDialectBySlug: Record<string, DocsDialectId> = {
  postgresql: "pg",
  neon: "pg",
  vercel: "pg",
  supabase: "pg",
  xata: "pg",
  pglite: "pg",
  nile: "pg",
  "bun-sql": "pg",
  "effect-postgresql": "pg",
  "planetscale-postgres": "pg",
  mysql: "mysql",
  planetscale: "mysql",
  tidb: "mysql",
  singlestore: "singlestore",
  sqlite: "sqlite",
  turso: "sqlite",
  "sqlite-cloud": "sqlite",
  "turso-database": "sqlite",
  d1: "sqlite",
  "bun-sqlite": "sqlite",
  "node-sqlite": "sqlite",
  do: "sqlite",
  expo: "sqlite",
  "op-sqlite": "sqlite",
  mssql: "mssql",
  cockroach: "cockroach",
};

export const resolveDocsDialectFromSlug = (slug: string): DocsDialectId => {
  const [, maybeDialect, maybeFolder, maybePage] = slug.split("/");

  if (maybeDialect && isDocsDialectId(maybeDialect)) {
    return maybeDialect;
  }

  if (maybeDialect === "get-started" && maybeFolder) {
    const getStartedSlug = maybeFolder.replace(/-(new|existing)$/, "");
    return getStartedDialectBySlug[getStartedSlug] || defaultDocsDialect;
  }

  if (maybeFolder === "get-started" && maybePage) {
    const getStartedSlug = maybePage.replace(/-(new|existing)$/, "");
    return getStartedDialectBySlug[getStartedSlug] || defaultDocsDialect;
  }

  return defaultDocsDialect;
};
