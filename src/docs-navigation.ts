import type { DocsDialectId } from "./dialect-docs";
import {
  defaultDocsDialect,
  isDocsDialectId,
  resolveDocsDialectFromSlug,
} from "./dialect-docs";

/** Resolve an existing equivalent topic without falling back to a different page. */
export function getDocsDialectHref({
  pathname,
  dialect,
  pagesByDialect,
  contentSlugs,
}: {
  pathname: string;
  dialect: DocsDialectId;
  pagesByDialect: Record<DocsDialectId, string[]>;
  contentSlugs: ReadonlySet<string>;
}): string | null {
  const [section, first, ...rest] = pathname
    .replace(/^\/+|\/+$/g, "")
    .replace(/\.html$/, "")
    .split("/");

  if (section !== "docs") {
    return null;
  }

  const topic = isDocsDialectId(first)
    ? rest.join("/")
    : [first, ...rest].join("/");
  const prefix = dialect === defaultDocsDialect ? "/docs" : `/docs/${dialect}`;

  if (topic.startsWith("get-started/")) {
    return resolveDocsDialectFromSlug(`docs/${topic}`) === dialect &&
      contentSlugs.has(topic)
      ? `/docs/${topic}`
      : null;
  }

  const [folder] = topic.split("/");
  const isListed =
    pagesByDialect[dialect].includes(topic) ||
    ((folder === "guides" || folder === "tutorials") &&
      pagesByDialect[dialect].includes(folder));
  const hasContent =
    contentSlugs.has(topic) || contentSlugs.has(`${dialect}/${topic}`);

  return isListed && hasContent ? `${prefix}/${topic}` : null;
}
