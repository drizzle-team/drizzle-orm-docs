import type { IHeading, TreeNode } from "@/types/astro";

export interface SidebarItem {
  type: "mdx" | "subDir" | "separator" | "empty";
  title: string;
  path: string;
}

interface metaItems {
  [key: string]:
    | string
    | {
        type: "separator";
        title: string;
      };
}

interface Props {
  headings?: IHeading[];
  slug?: string;
}

const getContentTree = async (props: Props) => {
  const metaFiles: Record<string, () => Promise<{ default: any }>> =
    await import.meta.glob("../content/**/*.json");
  const mdxFiles: Record<string, () => Promise<{ default: any }>> =
    await import.meta.glob("../content/**/*.mdx");
  const mdxPaths = Object.keys(mdxFiles);

  const regex = /\.\.\/content\/documentation\/(.*?)\/_meta\.json/;

  const navItems: SidebarItem[] = [];

  const getTypeOfFile = (value: string): SidebarItem["type"] => {
    if (mdxPaths.includes(`../content/documentation/${value}.mdx`)) {
      return "mdx";
    }
    if (mdxPaths.some((path) => path.includes(value))) {
      return "subDir";
    }
    return "empty";
  };

  for (const meta in metaFiles) {
    const parsed: metaItems = (await metaFiles[meta]()).default;

    const metaSlug = meta.match(regex);
    if (metaSlug) {
      const extractedText = metaSlug[1];
      const parsedKeys = Object.keys(parsed);
      parsedKeys.forEach((key) => {
        const parsedItem = parsed[key];
        if (typeof parsedItem === "string") {
          navItems.push({
            type: getTypeOfFile(`${metaSlug[1]}/${key}`),
            title: parsedItem,
            path: `${extractedText}/${key}`,
          });
        }
        if (typeof parsedItem === "object") {
          if (parsedItem.type === "separator") {
            navItems.push({
              type: "separator",
              title: parsedItem.title,
              path: `${extractedText}/${key}`,
            });
          }
        }
      });
    }
  }

  const dialectNames = ["sqlite", "pg", "mysql"];

  const buildTree = (items: SidebarItem[]): TreeNode[] => {
    const tree: TreeNode[] = [];
    for (const item of items) {
      const parts = item.path.split("/");
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

    const findDialects = (node: TreeNode) => {
      if (node.children) {
        const dialects = node.children.filter((child) =>
          dialectNames.includes(child.name),
        );
        if (dialects.length > 0) {
          node.type = "withDialects";
        }
        node.children.forEach((child) => findDialects(child));
      }
    };

    tree.forEach((node) => findDialects(node));

    return tree;
  };

  const tree = buildTree(navItems);

  const filteredHeadings =
    props.headings?.filter(
      (heading) => heading.depth === 2 || heading.depth === 3,
    ) ?? [];

  const findTitleBySlug = (
    tree: TreeNode[],
    slug: string,
  ): string | undefined => {
    const traverse = (
      node: TreeNode,
      currentSlug: string,
    ): string | undefined => {
      const currentPath = currentSlug
        ? `${currentSlug}/${node.name}`
        : node.name;
      if (currentPath === slug) {
        return node.title;
      }
      for (const child of node.children) {
        const result = traverse(child, currentPath);
        if (result !== undefined) {
          return result;
        }
      }
      return undefined;
    };
    for (const node of tree) {
      const result = traverse(node, "");
      if (result !== undefined) {
        return result;
      }
    }
    return undefined;
  };

  const title = findTitleBySlug(tree, props.slug ?? "");

  return {
    tree,
    filteredHeadings,
    title,
  };
};

export default getContentTree;
