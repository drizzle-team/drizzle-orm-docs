const mainScript = () => {
  const leftSidebar = document.querySelector(".aside-scroll");
  const navItems = document.querySelectorAll("[data-nav-index]");
  const headingsContainer = document.querySelector("[data-headings]");
  const headingsContainerHeight = headingsContainer?.clientHeight || 0;
  let itemIndex = 0;

  const activeNavItem = Array.from(navItems).find((item) => {
    return item.classList.contains("nav-item--active");
  });

  if (activeNavItem) {
    itemIndex = +(activeNavItem.getAttribute("data-nav-index") || 0);
  }
  if (navItems && leftSidebar) {
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        const nextIndex = +item.getAttribute("data-nav-index")!;
        const scrollTop =
          leftSidebar.scrollTop -
          (nextIndex > itemIndex ? headingsContainerHeight : 0);
        localStorage.setItem("sidebar-scroll", scrollTop.toString());
      });
    });

    const leftSidebarScroll = localStorage.getItem("sidebar-scroll");
    if (leftSidebarScroll !== null) {
      leftSidebar.scrollTop = parseInt(leftSidebarScroll, 10);
    }
  }
};

mainScript();
document.addEventListener("astro:after-swap", mainScript);
