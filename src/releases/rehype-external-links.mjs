import rehypeExternalLinks from "rehype-external-links";

// Release notes include plain .md files, which skip the MDX Link component.
// Mirror its external-link attributes for release content only.
export function releaseLinks() {
  const transform = rehypeExternalLinks({
    target: "_blank",
    rel: ["nofollow", "noreferrer"],
  });

  return (tree, file) => {
    if (!file.path?.replaceAll("\\", "/").includes("/content/docs/latest-releases/")) {
      return;
    }

    return transform(tree, file);
  };
}
