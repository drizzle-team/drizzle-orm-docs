// https://llmstxthub.com/guides/getting-started-llms-txt
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import {
  description,
  title,
} from "@/data/llms";

export const GET: APIRoute = async ({ url }) => {
  // Get the URL
  const getUrl = (path: string) => `${url.origin}/docs/${path}`;

  // Create the LLMS
  let llms = `# ${title}\n\n> ${description}\n`;

  const docCollection = await getCollection("docs", (entry) => {
    return {
      slug: entry.slug,
      body: entry.body,
      data: entry.data,
    };
  });

  // Get all meta files
  const metaFiles = import.meta.glob("../content/**/_meta.json");

  // Get all slugs from meta files
  const metaFilesSlugs = await Promise.all(
    Object.keys(metaFiles).map(async (meta) => {
      const metaFilePath = meta.replace("/_meta.json", "");
      const directoryName = metaFilePath.split("/")[3];
      // Add directory name as prefix to the slug
      const slugPrefix = directoryName ? `${directoryName}/` : "";

      const { default: parsed } = (await metaFiles[meta]()) as {
        default: string[] | string[][];
      };
      return parsed.map((slug) => {
        if (Array.isArray(slug)) {
          return slug.map((subSlug) => `${slugPrefix}${subSlug}`);
        }
        return `${slugPrefix}${slug}`;
      });
    }),
  );

  // Remove slugs with "---" and replace "::"(collapse block)
  const slugs = metaFilesSlugs
    .flat()
    .filter((slug) => !slug.includes("---"))
    .map((slug) => (typeof slug === "string" ? slug.replace("::", "") : slug));

  // Reorder the array (grouped by prefix)
  const reorderArray = (arr: string[]) => {
    const grouped: Record<string, string[]> = {};
    const order: string[] = [];

    arr.forEach((item) => {
      const prefix = item.includes("/") ? item.split("/")[0] : item;
      if (!grouped[prefix]) {
        grouped[prefix] = [];
        order.push(prefix);
      }
      grouped[prefix].push(item);
    });

    return order.flatMap((prefix) => grouped[prefix]);
  }

  // Get slugs without array
  const slugsWithOneValue = slugs.map((slug) => {
    if (Array.isArray(slug)) {
      return slug[0];
    }
    return slug;
  });

  const sortedSlugs = reorderArray(slugsWithOneValue);

  const formatedSlugs = sortedSlugs.map((slug) => {
    const slugArray = slugs.find((s) => s[0] === slug) as string[] | undefined;
    if (slugArray) {
      return slugArray;
    }
    return slug;
  });

  // Add the slugs to the LLMS
  formatedSlugs.forEach((slug) => {
    if (typeof slug === "string") {
      llms += `\n## ${slug}\n\n`;
    }

    // if the slug is an array, it means its a section
    if (Array.isArray(slug)) {
      const collectionEntry = docCollection.find(
        (entry) => slug[0] === entry.slug,
      );
      // Find title in the body
      const findTitle = collectionEntry?.body.match(/^# (.+)/gm);
      if (findTitle) {
        const sectionTitle = findTitle[0].replace("# ", "");
        llms += `- [${sectionTitle}](${getUrl(slug[0])})\n`;
      } else {
        // If title is not found in the body, use the title from the meta file
        const entryTitle = collectionEntry?.data.title;
        if (entryTitle) {
          llms += `- [${entryTitle}](${getUrl(slug[0])})\n`;
        }
      }
    }
  });

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
    const collectionEntry = docCollection.find(
      (entry) => slug[0] === entry.slug,
    );
    const guideTitle = collectionEntry?.data.title;
    const guideSlug = collectionEntry?.data.slug || slug[0];
    if (guideTitle) {
      llms += `- [${guideTitle}](` + getUrl(`guides/${guideSlug}`) + `)\n`;
    }
  });

  // Tutorials
  llms += `\n## Tutorials\n\n`;

  const tutorialsEntries = docCollection.filter((entry) => entry.slug.includes("tutorials"));

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
