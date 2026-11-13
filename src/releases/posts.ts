import { getCollection } from "astro:content";
import { z } from "astro/zod";
import { toReleaseMarkdownBody } from "./markdown";

const releaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(""),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  image: z.string().optional(),
  version: z.string().optional(),
});

type ReleasePostData = z.output<typeof releaseSchema>;

export function getReleasePath(slug: string): string {
  return `/latest-releases/${slug}`;
}

export function formatReleaseDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Publishes non-draft releases dated today or earlier, newest first. */
export async function getReleasePosts() {
  const entries = await getCollection("docs", ({ slug }) =>
    slug.startsWith("latest-releases/"),
  );
  const now = new Date();

  return entries
    .map((entry) => ({
      slug: entry.slug.slice("latest-releases/".length),
      data: releaseSchema.parse(entry.data),
      body: entry.body,
      entry,
    }))
    .filter(({ data }) => !data.draft && data.pubDate <= now)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function toReleaseMarkdown(
  post: { data: ReleasePostData; body: string },
  canonicalUrl: string,
): string {
  return (
    [
      `# ${post.data.title}`,
      post.data.description,
      `Published: ${post.data.pubDate.toISOString().slice(0, 10)}`,
      ...(post.data.updatedDate
        ? [`Updated: ${post.data.updatedDate.toISOString().slice(0, 10)}`]
        : []),
      `Source: ${canonicalUrl}`,
      toReleaseMarkdownBody(post.body),
    ]
      .filter(Boolean)
      .join("\n\n") + "\n"
  );
}
