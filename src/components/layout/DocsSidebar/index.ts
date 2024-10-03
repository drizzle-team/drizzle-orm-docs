const mainScript = () => {
  const expandedSections: string[] = localStorage.getItem("expandedSections")
    ? JSON.parse(localStorage.getItem("expandedSections")!)
    : [];

  document.querySelectorAll(".nav-items-collapsable").forEach((section) => {
    if (expandedSections.find((v) => v === section.id)) {
      section.classList.add("expanded");
    } else {
      section.classList.remove("expanded");
    }
  });

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

    const findPreviousNavSeparator = (
      element: Element | null,
    ): HTMLElement | null => {
      if (!element) return null;

      let previousElement =
        element.previousElementSibling as HTMLElement | null;

      while (previousElement) {
        if (previousElement.classList.contains("nav-separator")) {
          return previousElement;
        }
        previousElement =
          previousElement.previousElementSibling as HTMLElement | null;
      }

      return null;
    };

    const leftSidebarScroll = localStorage.getItem("sidebar-scroll");
    if (leftSidebarScroll !== null) {
      leftSidebar.scrollTop = parseInt(leftSidebarScroll, 10);
    } else if (activeNavItem) {
      if (
        findPreviousNavSeparator(activeNavItem)?.classList.contains(
          "nav-separator-collapsable",
        )
      ) {
        leftSidebar.scrollTop =
          findPreviousNavSeparator(activeNavItem)!.parentElement!.offsetTop;
      } else {
        leftSidebar.scrollTop =
          findPreviousNavSeparator(activeNavItem)!.offsetTop;
      }
    }
  }
};

document.addEventListener("astro:after-swap", mainScript);
