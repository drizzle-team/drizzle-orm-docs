// @vitest-environment node
import { fileURLToPath } from "node:url";
import { build, normalizePath } from "vite";
import { expect, test } from "vitest";

const root = fileURLToPath(new URL("../", import.meta.url));
const contentDirectory = normalizePath(
  fileURLToPath(new URL("../src/content/", import.meta.url)),
);

test("builds client helpers without loading documentation MDX", async () => {
  await expect(
    build({
      root,
      configFile: false,
      envFile: false,
      logLevel: "silent",
      resolve: {
        alias: { "@": fileURLToPath(new URL("../src", import.meta.url)) },
      },
      plugins: [
        {
          name: "reject-client-mdx",
          enforce: "pre",
          load(id) {
            const path = normalizePath(id.split("?")[0]);
            if (path.startsWith(contentDirectory) && path.endsWith(".mdx")) {
              throw new Error(`Client helpers must not load MDX content: ${path}`);
            }
          },
        },
      ],
      build: {
        write: false,
        minify: false,
        lib: {
          entry: fileURLToPath(new URL("../src/utils-client.ts", import.meta.url)),
          formats: ["es"],
          fileName: "utils-client",
        },
      },
    }),
  ).resolves.toBeDefined();
}, 20_000);
