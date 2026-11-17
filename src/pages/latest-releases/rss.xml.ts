import type { APIRoute } from "astro";

import { getReleasePosts, getReleasePath } from "@/releases/posts";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = async ({ site }) => {
  const posts = await getReleasePosts();
  const releasesUrl = new URL("/latest-releases", site).toString();
  const items = posts.map((post) => {
    const url = new URL(getReleasePath(post.slug), site).toString();

    return `<item><title>${escapeXml(post.data.title)}</title><link>${escapeXml(url)}</link><guid isPermaLink="true">${escapeXml(url)}</guid><pubDate>${post.data.pubDate.toUTCString()}</pubDate><description>${escapeXml(post.data.description)}</description></item>`;
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Drizzle Releases</title><link>${escapeXml(releasesUrl)}</link><description>Release notes for Drizzle ORM and Drizzle Kit.</description><language>en</language>${items.join("")}</channel></rss>`,
    {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    },
  );
};
