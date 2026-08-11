import { description, title } from "@/data/llms";
import { defaultDocsDialect } from "@/dialect-docs";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ url }) => {
  let llms = `# ${title}\n\n> ${description}\n\n`;

  const docCollection = await getCollection("docs", (entry) => {
    return {
      slug: entry.slug,
      body: entry.body,
    }
  });

  docCollection.filter((entry) => {
    if (entry.slug.includes("latest-releases") || entry.slug.includes("migrate/")) {
      return false;
    }
    return true;
  }).forEach((doc) => {
    if (doc.slug.includes("tutorials/")) {
      const tutorialSlug = doc.slug.split("/").at(-1);
      llms += `Source: ${url.origin}/docs/tutorials/${tutorialSlug}\n\n${doc.body}\n\n`;
    } else {
      // Default dialect (pg) has no URL prefix, so strip it from the slug
      const slug = doc.slug.startsWith(`${defaultDocsDialect}/`)
        ? doc.slug.slice(defaultDocsDialect.length + 1)
        : doc.slug;
      llms += `Source: ${url.origin}/docs/${slug}\n\n${doc.body}\n\n`;
    }
  });

  return new Response(llms);
};
