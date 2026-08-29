// https://llmstxthub.com/guides/getting-started-llms-txt
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { description, title } from "@/data/llms";
import { defaultDocsDialect, docsDialectIds } from "@/dialect-docs";
import { dialectSwitcherItems } from "@mdx/dialect-switcher/data";

type MetaItem = string | string[];

export const GET: APIRoute = async ({ url }) => {
  const getUrl = (path: string) => `${url.origin}/docs/${path}`;

  // Human-readable dialect name (pg -> PostgreSQL, etc.)
  const dialectName = (id: string) =>
    dialectSwitcherItems.find((item) => item.id === id)?.name ?? id;

  let llms = `# ${title}\n\n> ${description}\n`;

  const docCollection = await getCollection("docs");
  const entryBySlug = new Map<string, (typeof docCollection)[number]>(
    docCollection.map((entry) => [entry.slug, entry]),
  );

  // Prefer the page's H1, fall back to the meta title, then the slug
  const linkTitle = (dialect: string, slug: string, metaTitle?: string) => {
    const entry =
      entryBySlug.get(`${dialect}/${slug}`) ?? entryBySlug.get(slug);
    const h1 = entry?.body.match(/^# (.+)/m)?.[1];
    return h1 ?? metaTitle ?? slug;
  };

  // Each dialect keeps its own _meta.json; root pages are referenced there too,
  // so iterating per dialect duplicates the shared content under every dialect.
  const metaFiles = import.meta.glob<{ default: MetaItem[] }>(
    "../content/docs/*/_meta.json",
  );

  for (const dialect of docsDialectIds) {
    const loader = metaFiles[`../content/docs/${dialect}/_meta.json`];
    if (!loader) continue;

    const { default: items } = await loader();

    // Default dialect (pg) has no url prefix
    const prefix = dialect === defaultDocsDialect ? "" : `${dialect}/`;

    llms += `\n## ${dialectName(dialect)}\n`;

    for (const item of items) {
      // Section header
      if (typeof item === "string") {
        if (item === "---") continue; // visual separator, no heading
        llms += `\n### ${item.replace("::", "")}\n\n`;
        continue;
      }

      // Page link
      const [rawSlug, metaTitle] = item;
      if (rawSlug.includes("---")) continue;
      const slug = rawSlug.replace("::", "");
      llms += `- [${linkTitle(dialect, slug, metaTitle)}](${getUrl(`${prefix}${slug}`)})\n`;
    }
  }

  // Guides
  const mapFiles = import.meta.glob("../content/**/_map.json");
  const guidesSlugs = [];
  for (let map in mapFiles) {
    const { default: parsed } = (await mapFiles[map]()) as {
      default: string[][];
    };
    // Add the parsed slugs to the guidesSlugs array
    guidesSlugs.push(...parsed);
  }

  llms += `\n## Guides\n\n`;

  // Main Guides page
  llms += `- [Guides](${getUrl("guides")})\n`;
  guidesSlugs.forEach((slug) => {
    // Collection slugs are prefixed with the folder ("guides/<name>")
    const collectionEntry = entryBySlug.get(`guides/${slug[0]}`);
    const guideTitle = collectionEntry?.data.title ?? slug[1];
    const guideSlug = collectionEntry?.data.slug || slug[0];
    if (guideTitle) {
      llms += `- [${guideTitle}](` + getUrl(`guides/${guideSlug}`) + `)\n`;
    }
  });

  // Drizzle Studio
  llms += `\n## Drizzle Studio\n\n`;
  llms += `- [Meet Drizzle Studio](${url.origin}/drizzle-studio/overview)\n`;

  // Tutorials
  llms += `\n## Tutorials\n\n`;

  const tutorialsEntries = docCollection.filter((entry) =>
    entry.slug.includes("tutorials"),
  );

  // Main Tutorials page
  llms += `- [Tutorials](${getUrl("tutorials")})\n`;

  tutorialsEntries.forEach((entry) => {
    const tutorialTitle = entry.data.title;
    // Tutorial slug has group name as prefix, so we need to remove it to get the correct slug
    const tutorialsSlug = "tutorials/" + entry.slug.split("/").at(-1);
    if (tutorialTitle) {
      llms += `- [${tutorialTitle}](` + getUrl(tutorialsSlug) + `)\n`;
    }
  });

  return new Response(llms);
};
