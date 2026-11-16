import { getCollection } from "astro:content";
import { z } from "astro/zod";

const releaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(""),
  pubDate: z.coerce.date(),
});

export function getReleasePath(slug: string): string {
  return `/docs/latest-releases/${slug}`;
}

export function formatReleaseDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Returns all releases, newest first. */
export async function getReleasePosts() {
  const entries = await getCollection("docs", ({ slug }) =>
    slug.startsWith("latest-releases/"),
  );
  return entries
    .map((entry) => ({
      slug: entry.slug.slice("latest-releases/".length),
      data: releaseSchema.parse(entry.data),
    }))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
