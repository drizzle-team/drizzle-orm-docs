import type { APIRoute } from "astro";

const isProd = import.meta.env.PROD_BUILD === "true";

const robotsTxt = isProd
  ? `User-agent: *
Allow: /

Sitemap: https://orm.drizzle.team/sitemap-index.xml`
  : `User-agent: *
Disallow: /`;

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
