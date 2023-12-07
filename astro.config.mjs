import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import AutoImport from "astro-auto-import";
import react from "@astrojs/react";
import {
  astroCodeSnippets,
  codeSnippetAutoImport,
} from "./integration/astro-code-snippets";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
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
    shikiConfig: {
      theme: "css-variables",
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
  },
});
