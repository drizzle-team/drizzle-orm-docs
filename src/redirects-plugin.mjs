import { readFileSync, existsSync, watch } from "node:fs";
import { resolve } from "node:path";

/**
 * Vite plugin that honors a Netlify-style `public/_redirects` file during
 * `astro dev`. In production Cloudflare Pages reads `_redirects` itself, but the
 * dev server ignores it — this brings parity so links resolve the same locally.
 *
 * Supported syntax:
 *   /from            /to                 [status]
 *   /from/*          /to/:splat          [status]   (splat = everything matched by `*`)
 *   /from            https://external…   [status]
 * Status defaults to 301 when omitted.
 */
export function redirectsPlugin() {
  let rules = [];

  const parse = (filePath) => {
    if (!existsSync(filePath)) return [];
    return readFileSync(filePath, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const [from, to, status] = line.split(/\s+/);
        if (!from || !to) return null;
        const hasSplat = from.endsWith("/*");
        // Build a matcher: `/a/*` -> `/^\/a\/(.*)$/`, `/a` -> `/^\/a$/`
        const base = hasSplat ? from.slice(0, -2) : from;
        const pattern = new RegExp(
          "^" +
            base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            (hasSplat ? "(?:/(.*))?" : "") +
            "/?$",
        );
        return { pattern, to, status: Number(status) || 301, hasSplat };
      })
      .filter(Boolean);
  };

  return {
    name: "netlify-redirects-dev",
    apply: "serve",
    configureServer(server) {
      const filePath = resolve(server.config.root, "public/_redirects");
      rules = parse(filePath);

      // Hot-reload rules when the file changes
      if (existsSync(filePath)) {
        watch(filePath, () => {
          rules = parse(filePath);
          server.config.logger.info("[redirects] reloaded public/_redirects");
        });
      }

      // Register synchronously so this runs before Astro's catch-all
      // middleware (which would otherwise 404 the path first).
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, "http://localhost");
        const pathname = decodeURIComponent(url.pathname);

        for (const rule of rules) {
          const match = rule.pattern.exec(pathname);
          if (!match) continue;

          const splat = rule.hasSplat ? match[1] ?? "" : "";
          const target = rule.to.replace(/:splat/g, splat);

          res.statusCode = rule.status;
          res.setHeader("Location", target + url.search);
          res.end();
          return;
        }
        next();
      });
    },
  };
}
