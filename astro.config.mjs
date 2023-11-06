import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import AutoImport from "astro-auto-import";
import {
  astroCodeSnippets,
  codeSnippetAutoImport,
} from "./integration/astro-code-snippets";

// const setLayout = () => {
//   return function (_, file) {
//     file.data.astro.frontmatter.layout =
//       file.data.astro.frontmatter.layout || "@layouts/MDXLayout.astro";
//   };
// };

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    AutoImport({
      imports: [codeSnippetAutoImport],
    }),
    astroCodeSnippets(),
    mdx(),
    react({
      experimentalReactChildren: true,
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    // remarkPlugins: [setLayout],
    shikiConfig: {
      theme: "css-variables",
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
  },
});
