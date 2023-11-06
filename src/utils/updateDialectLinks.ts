const updateDialectLinks = () => {
  const linksWithDialects = document.querySelectorAll("[data-href]");
  const savedDialect = localStorage.getItem("dialect") || "pg";

  linksWithDialects.forEach((link) => {
    const href = (link as HTMLAnchorElement).dataset.href;
    (link as HTMLAnchorElement).href = `${href}/${savedDialect}`;
  });
};

export default updateDialectLinks;
