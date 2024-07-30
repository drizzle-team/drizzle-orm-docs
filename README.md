## 🚀 Project Structure

MDX files are located in this folder:

```text
├── src/
│   ├── content/
│   │   └── documentation
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