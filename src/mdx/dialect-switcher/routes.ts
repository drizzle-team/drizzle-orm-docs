import type { DocsDialectId } from "../../dialect-docs";
import { getDocsDialectHref } from "../../docs-navigation";
import pgMeta from "../../content/docs/pg/_meta.json";
import mysqlMeta from "../../content/docs/mysql/_meta.json";
import sqliteMeta from "../../content/docs/sqlite/_meta.json";
import singlestoreMeta from "../../content/docs/singlestore/_meta.json";
import mssqlMeta from "../../content/docs/mssql/_meta.json";
import cockroachMeta from "../../content/docs/cockroach/_meta.json";

const metaByDialect = {
  pg: pgMeta,
  mysql: mysqlMeta,
  sqlite: sqliteMeta,
  singlestore: singlestoreMeta,
  mssql: mssqlMeta,
  cockroach: cockroachMeta,
};
const pagesByDialect = Object.fromEntries(
  Object.entries(metaByDialect).map(([dialect, meta]) => [
    dialect,
    meta.flatMap((item) =>
      Array.isArray(item) ? [item[0]] : [],
    ),
  ]),
) as Record<DocsDialectId, string[]>;
const contentSlugs = new Set(
  Object.keys(import.meta.glob("../../content/docs/**/*.mdx")).map((path) =>
    path.replace("../../content/docs/", "").replace(/\.mdx$/, ""),
  ),
);

export function getDialectHref(
  pathname: string,
  dialect: DocsDialectId,
): string | null {
  return getDocsDialectHref({
    pathname,
    dialect,
    pagesByDialect,
    contentSlugs,
  });
}
