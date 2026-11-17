import rehypeExternalLinks from "rehype-external-links";

// Apply external-link attributes only to release content.
export function releaseLinks() {
  const transform = rehypeExternalLinks({
    target: "_blank",
    rel: ["noopener", "noreferrer"],
  });

  return (tree, file) => {
    if (!file.path?.replaceAll("\\", "/").includes("/content/docs/latest-releases/")) {
      return;
    }

    return transform(tree, file);
  };
}
