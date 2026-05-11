export const docsDialectIds = ["pg", "mysql", "sqlite", "singlestore"] as const;

export type DocsDialectId = (typeof docsDialectIds)[number];

export const defaultDocsDialect: DocsDialectId = "pg";

export const dialectRelatedFolder = ["tutorials", "guides"] as const;

export const commonFolders = ["latest-releases", "get-started"] as const;
const docsDialectIdSet = new Set<string>(docsDialectIds);

export const isDocsDialectId = (value: string): value is DocsDialectId =>
  docsDialectIdSet.has(value);
