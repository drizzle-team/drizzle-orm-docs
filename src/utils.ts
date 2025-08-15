import type { IHeading, TreeNode } from "@/types";
import { commonFolders, dialectRelatedFolder } from "./pages/[...slug].astro";

export const addNofollowToExternalLinks = (html: string): string => {
  const externalLinkPattern =
    /<a\s+(?![^>]*\brel=["']nofollow["'])([^>]*\bhref=["']https?:\/\/(?!(orm\.drizzle\.team|drizzle\.team)[^"']*)[^"']+["'][^>]*)>/gi;

  return html
    .replace(externalLinkPattern, '<a $1 rel="nofollow">')
    .replace(/<a(?![^>]*\btarget=["'][^"']*["'])/gi, '<a target="_blank"');
};

export type Months = Record<string, string[]>;

export const fillMonthsGaps = (monthsObject: Months): Months => {
  const months = { ...monthsObject };

  const getMonthStart = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const addMonths = (date: Date, monthsToAdd: number): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + monthsToAdd);
    return result;
  };

  const parseDate = (dateString: string): Date => {
    return new Date(dateString);
  };

  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}`;
  };

  const sortedKeys = Object.keys(months).sort(
    (a, b) => parseDate(a).getTime() - parseDate(b).getTime(),
  );

  let currentMonthStart = getMonthStart(parseDate(sortedKeys[0]));

  const now = new Date();
  const currentMonth = getMonthStart(now);

  let filledMonths: Months = {};

  for (const key of sortedKeys) {
    const month = months[key];
    const monthStart = getMonthStart(parseDate(key));

    while (currentMonthStart.getTime() < monthStart.getTime()) {
      filledMonths = { ...filledMonths, [formatDate(currentMonthStart)]: [] };
      currentMonthStart = addMonths(currentMonthStart, 1);
    }

    filledMonths = { ...filledMonths, [key]: month };
    currentMonthStart = addMonths(currentMonthStart, 1);
  }

  while (currentMonthStart.getTime() <= currentMonth.getTime()) {
    filledMonths = { ...filledMonths, [formatDate(currentMonthStart)]: [] };
    currentMonthStart = addMonths(currentMonthStart, 1);
  }

  return filledMonths;
};

type MetaItems = Array<string | string[]>;

export interface SidebarItem {
  type:
    | "mdx"
    | "subDir"
    | "separator"
    | "empty"
    | "dot-separator"
    | "collapsable";
  title: string;
  path: string;
}

interface ContentTreeProps {
  headings?: IHeading[];
  slug?: string;
}

const extractSubDirFromFilePath = (path: string): string | null => {
  const match = path.match(/\.\/content\/docs\/([^/]+)\/_meta\.json$/);
  return match ? match[1] : null;
};

export const extractSubDirFromSlug = (slug: string): string | null => {
  const match = slug.match(/^docs\/([^/]+)\/.+/);
  return match ? match[1] : null;
};

export const getContentTree = async (props: ContentTreeProps) => {
  const [metaFiles, mdxFiles] = await Promise.all([
    import.meta.glob<Array<string | string[]>>("./content/**/_meta.json"),
    import.meta.glob<Array<string | string[]>>("./content/**/*.mdx"),
  ]);

  const mdxPaths = Object.keys(mdxFiles);
  const subDirSlug = extractSubDirFromSlug(props.slug || "");
  const filteredMetaFiles: Record<
    string,
    () => Promise<(string | string[])[]>
  > = {};

  Object.entries(metaFiles).forEach(([key, p]) => {
    const subDir = extractSubDirFromFilePath(key);
    if (!subDir) {
      filteredMetaFiles[key] = p;
      return;
    }
    if (
      (subDir === "pg" && !subDirSlug) ||
      (subDir === "pg" &&
        subDirSlug &&
        [...commonFolders, ...dialectRelatedFolder].includes(subDirSlug))
    ) {
      filteredMetaFiles[key] = p;
      return;
    }
    if (subDir && subDirSlug && subDir === subDirSlug) {
      filteredMetaFiles[key] = p;
      return;
    }
  });

  const navItems: SidebarItem[] = [];

  const getTypeOfFile = (value: string): SidebarItem["type"] => {
    if (mdxPaths.some((path) => path.includes(`/get-started/${value}`))) {
      return "empty";
    }
    return "mdx";
  };

  for (const meta in filteredMetaFiles) {
    const parsed: MetaItems = (await filteredMetaFiles[meta]()).default;

    parsed.forEach((key, i) => {
      if (Array.isArray(key)) {
        navItems.push({
          type: getTypeOfFile(`${key[0]}`),
          title: key[1],
          path: `docs/${key[0]}`,
        });
      }
      if (typeof key === "string") {
        if (key === "---") {
          navItems.push({
            type: "dot-separator",
            title: "dot-separator",
            path: `docs/${key}${i}`,
          });
        } else if (key.includes("::")) {
          navItems.push({
            type: "collapsable",
            title: key.replace("::", ""),
            path: `docs/${key}`,
          });
        } else {
          navItems.push({
            type: "separator",
            title: key,
            path: `docs/${key}`,
          });
        }
      }
    });
  }

  const buildTree = (items: SidebarItem[]): TreeNode[] => {
    const tree: TreeNode[] = [];
    for (const item of items) {
      const parts = item.path?.split("/");
      let currentNode = tree;
      for (const part of parts) {
        const existingNode = currentNode.find((node) => node.name === part);
        if (existingNode && existingNode.children) {
          currentNode = existingNode.children;
        } else {
          const newNode: TreeNode = {
            name: part,
            type: item.type,
            title: item.title,
            children: [],
          };
          currentNode.push(newNode);
          currentNode = newNode.children;
        }
      }
    }

    return tree;
  };

  const tree = buildTree(navItems);

  const filteredHeadings =
    props.headings?.filter(
      (heading) => heading.depth === 2 || heading.depth === 3,
    ) ?? [];

  const findTitleBySlug = async (
    slug?: string,
  ): Promise<string | undefined> => {
    if (!slug) return undefined;
    const slugParts = slug.split("/");
    const sliced = slugParts.slice(0, slugParts?.length - 1);
    const lastSlugPart = slugParts[slugParts.length - 1];
    const meta = metaFiles[`./content/${sliced.join("/")}/_meta.json`];
    const rootMeta = metaFiles[`./content/docs/_meta.json`];
    const pgMeta = metaFiles[`./content/docs/pg/_meta.json`];
    if (meta) {
      const [metaModule, rootMetaModule] = await Promise.all([
        meta(),
        rootMeta(),
      ]);
      const metaContent = metaModule?.default as string[][];
      const rootMetaContent = rootMetaModule?.default as string[][];
      const pgMetaContent = !subDirSlug
        ? ((await pgMeta()).default as string[][])
        : [];
      const title = [...metaContent, ...rootMetaContent, ...pgMetaContent].find(
        ([key]) => key === lastSlugPart,
      )?.[1];
      return title;
    }
    return undefined;
  };

  const title = await findTitleBySlug(props.slug);

  return {
    tree,
    filteredHeadings,
    title,
  };
};

export const getMonthLabel = (startDate: string): string => {
  const start = new Date(startDate);
  const now = new Date();

  const inputMonthStart = new Date(start.getFullYear(), start.getMonth(), 1);

  const diffMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());

  if (diffMonths === 0) {
    return "this month";
  } else {
    if (start.getFullYear() !== now.getFullYear()) {
      return inputMonthStart.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
    } else {
      return inputMonthStart.toLocaleString("en-US", {
        month: "long",
      });
    }
  }
};

export const isAbsoluteUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
