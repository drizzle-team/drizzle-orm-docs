## 🚀 Project Structure

MDX files are located in this folder:

```text
├── src/
│   ├── content/
│   │   └── docs
```

Announcements markdown files:

```text
├── src/
│   ├──data/
│   │   └── announcements
```

Roadmap markdown file:

```text
├── src/
│   ├──data/
│   │   └── roadmap.md
```

Shipping section yaml file:

```text
├── src/
│   ├──data/
│   │   └── shipping.yaml
```

```
progress: number
weeks:
  - date:
      start: "YYYY-MM-DD"
    details:
      - string
```


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## 📄 License

The documentation in this repository is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](./LICENSE). You are free to copy, redistribute and adapt it in any medium or format, including commercially, as long as you give appropriate credit.

Copyright © Drizzle Team.

### Attribution and canonical links

When you redistribute or adapt the docs (mirrors, offline documentation browsers, translations, etc.), you must give attribution in the following manner:

1. Credit **Drizzle Team** as the author and state that the content is licensed under CC BY 4.0, with a link to the [license](https://creativecommons.org/licenses/by/4.0/).
2. Link every redistributed page to its original page on `https://orm.drizzle.team`, e.g. a copy of `src/content/docs/select.mdx` links to `https://orm.drizzle.team/docs/select`.
3. Indicate if you changed the content.
4. If you republish the docs as web pages, every such page must declare the original page as its canonical URL, so search engines treat `orm.drizzle.team` as the source. A visible link alone is not sufficient:

```html
<link rel="canonical" href="https://orm.drizzle.team/docs/select" />
```

The Drizzle name and logos are not covered by this license.
