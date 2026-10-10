import { description, title } from "@/data/llms";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Pages which live outside of the "docs" content collection
const standalonePages = import.meta.glob("./drizzle-studio/*.mdx", {
  query: "?raw",
  import: "default",
});

// MDX pages have no frontmatter and are wrapped into layout/components,
// so we strip everything which is not a part of the content itself
const stripMdx = (source: string) =>
  source
    .replace(/^import\s.+$/gm, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<Npm>([\s\S]*?)<\/Npm>/g, (_, body: string) => toShell(body, "npm i"))
    .replace(/<Npx>([\s\S]*?)<\/Npx>/g, (_, body: string) => toShell(body, "npx"))
    .replace(/<\/?[A-Z][^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const toShell = (body: string, command: string) => {
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `${command} ${line}`);
  return `\n\`\`\`shell\n${lines.join("\n")}\n\`\`\`\n`;
};

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
      llms += `Source: ${url.origin}/docs/${doc.slug}\n\n${doc.body}\n\n`;
    }
  });

  for (const path in standalonePages) {
    const source = (await standalonePages[path]()) as string;
    const slug = path.replace("./", "").replace(".mdx", "");
    llms += `Source: ${url.origin}/${slug}\n\n${stripMdx(source)}\n\n`;
  }

  return new Response(llms);
};
