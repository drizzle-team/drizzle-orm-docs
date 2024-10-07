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
import sitemap from "@astrojs/sitemap";
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.DEV ? "http://localhost:4321" : "https://orm.drizzle.team",
  build: {
    format: "file", // mandatory due to CloudFlare Pages trailing slash problem
  },
  vite: {
    plugins: [yaml()]
  },
  image: {
    domains: ["img.youtube.com"],
  },
  prefetch: import.meta.env.DEV ? undefined : {
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
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            class: "autolink-header",
            ariaHidden: true,
            tabIndex: -1,
          },
          test: ['h2', 'h3', 'h4', 'h5'],
        },
      ],
    ],
    shikiConfig: {
      theme: "css-variables",
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
  },
});
