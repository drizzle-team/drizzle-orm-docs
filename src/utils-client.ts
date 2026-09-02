import { customSponsors } from "@/data/custom-sponsors";
import { rotateArrayDaily } from "@/utils";
import { type ISponsor } from "@/types";

interface AnchorProps {
  viewportHeight: number;
  anchors: {
    id: string;
    offsetTop: number;
  }[];
  scrollTop: number;
}

export const handleAnchorHighlighting = (props: AnchorProps) => {
  const activeAnchors: string[] = [];

  const { anchors } = props;

  for (let i = anchors.length - 1; i >= 0; i--) {
    const anchorTop = anchors[i].offsetTop;

    if (
      anchorTop < props.scrollTop + props.viewportHeight &&
      anchorTop + 75 > props.scrollTop
    ) {
      activeAnchors.push(anchors[i].id);
    }
  }

  const closestAnchor = anchors.find(
    (anchor) => anchor.offsetTop > props.scrollTop,
  );

  if (closestAnchor && closestAnchor.offsetTop - 75 > props.scrollTop) {
    const index = anchors.findIndex(
      (anchor) => anchor.offsetTop === closestAnchor.offsetTop,
    );
    if (index !== -1) {
      const item = anchors[index - 1];
      if (item && !activeAnchors.includes(item.id)) {
        activeAnchors.push(item.id);
      }
    }
  }

  if (!closestAnchor) {
    activeAnchors.push(anchors[anchors.length - 1]?.id);
  }

  return activeAnchors;
};

export const sponsorsHandler = async () => {
  const response = await fetch("https://api.drizzle.team/v2/sponsors");
  const { sponsors } = await response.json();

  const allSponsors = [...customSponsors, ...sponsors];
  let pastSponsors: ISponsor[] = [];

  const currentDate = new Date();
  const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

  const filterFunc = (item: ISponsor) => {
    const isWithinOneMonth =
      currentDate.getTime() - new Date(item.createdAt).getTime() <
      oneMonthInMilliseconds;
    if (
      (isWithinOneMonth || item.isActive) &&
      item.sponsorEntity.name !== "usemotion"
    ) {
      return true;
    }
    if (!isWithinOneMonth || !item.isActive) {
      pastSponsors.push(item);
    }
    return false;
  };

  let superhero: ISponsor[] = [];
  let hero: ISponsor[] = [];
  let gold: ISponsor[] = [];
  let silver: ISponsor[] = [];
  let bronze: ISponsor[] = [];
  let ramen: ISponsor[] = [];
  let coffee: ISponsor[] = [];

  allSponsors.forEach((s) => {
    const regex = s.tier.name.match(/[0-9]+(,[0-9]+)*/gi);
    if (regex) {
      const num = +regex[0].replace(/,/, "");
      if (num < 25) {
        coffee.push(s);
      }
      if (num >= 25 && num < 100) {
        ramen.push(s);
      }
      if (num >= 100 && num < 250) {
        bronze.push(s);
      }
      if (num >= 250 && num < 1000) {
        silver.push(s);
      }
      if (num >= 1000 && num < 2500) {
        gold.push(s);
      }
      if (num >= 2500 && num < 10000) {
        hero.push(s);
      }
      if (num >= 10000) {
        superhero.push(s);
      }
    }
  });

  gold = gold.filter((s) => s.sponsorEntity.login !== "samalberto25" && s.sponsorEntity.login !== "lokalise");
  hero = hero.filter((s) => s.sponsorEntity.login !== "railwayapp" && s.sponsorEntity.login !== "railway");

  superhero = superhero.filter((s) => filterFunc(s));
  hero = hero.filter((s) => filterFunc(s));
  gold = gold.filter((s) => filterFunc(s));
  silver = silver.filter((s) => filterFunc(s));
  bronze = bronze.filter((s) => filterFunc(s));
  ramen = ramen.filter((s) => filterFunc(s));
  coffee = coffee.filter((s) => filterFunc(s));

  pastSponsors = pastSponsors.filter(
    (s) =>
      s.sponsorEntity.login !== "chiselstrike" &&
      s.sponsorEntity.login !== "unkeyed",
  );

  const arrays = [
    {
      name: "hero",
      items: rotateArrayDaily(hero),
    },
    {
      name: "gold",
      items: rotateArrayDaily(gold),
    },
    {
      name: "silver",
      items: rotateArrayDaily(silver),
    },
    {
      name: "bronze",
      items: rotateArrayDaily(bronze),
    },
    {
      name: "ramen",
      items: rotateArrayDaily(ramen),
    },
    {
      name: "coffee",
      items: rotateArrayDaily(coffee),
    },
    {
      name: "past",
      items: rotateArrayDaily(pastSponsors),
    },
  ];

  return arrays;
};

export const updateDialectLinks = () => {
  const linksWithDialects = document.querySelectorAll("[data-href]");
  const savedDialect = localStorage.getItem("dialect") || "pg";

  linksWithDialects.forEach((link) => {
    const href = (link as HTMLAnchorElement).dataset.href;
    (link as HTMLAnchorElement).href = `${href}/${savedDialect}`;
  });
};

const dialectParam = "dialect";

const dialectAliases: Record<string, string> = {
  postgresql: "postgresql",
  postgres: "postgresql",
  pg: "postgresql",
  mysql: "mysql",
  sqlite: "sqlite",
  sqllite: "sqlite",
  singlestore: "singlestore",
  "single store": "singlestore",
  mssql: "mssql",
  "ms sql": "mssql",
  cockroachdb: "cockroachdb",
  cockroach: "cockroachdb",
  turso: "turso",
};

const normalizeDialectValue = (value: string | undefined | null) => {
  if (!value) return;

  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\s*\(wip\)\s*$/u, "")
    .replace(/[-_]+/gu, " ")
    .replace(/\s+/gu, " ");

  return dialectAliases[normalized];
};

const getTabButtonDialect = (button: HTMLElement) => {
  return normalizeDialectValue(button.dataset.tabLabel ?? button.textContent);
};

const activateTabButton = (button: HTMLElement) => {
  const parent = button.parentElement;
  if (!parent) return;

  const index = Array.from(parent.children).indexOf(button);
  const content = parent.nextElementSibling;
  const isCodeTab = button.hasAttribute("data-change-code-tab-btn");
  const activeClass = isCodeTab ? "codetabs_tab--active" : "tabs__button--active";
  const inactiveClass = isCodeTab ? "codetabs_tab" : "tabs__button";

  if (content) {
    Array.from(content.children).forEach((child, contentIndex) => {
      child.classList.toggle("hidden", contentIndex !== index);
    });
  }

  Array.from(parent.children).forEach((child, buttonIndex) => {
    child.classList.toggle(inactiveClass, buttonIndex !== index);
    child.classList.toggle(activeClass, buttonIndex === index);
  });
};

const updateDialectQueryParam = (dialect: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(dialectParam, dialect);
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
};

const activateDialectTabs = (dialect: string) => {
  const tabGroups = new Set<Element>();
  const selector = "[data-change-tab-btn], [data-change-code-tab-btn]";

  document.querySelectorAll<HTMLElement>(selector).forEach((button) => {
    const parent = button.parentElement;
    if (!parent || tabGroups.has(parent)) return;

    const matchingButton = Array.from(parent.children).find((child) => {
      return getTabButtonDialect(child as HTMLElement) === dialect;
    }) as HTMLElement | undefined;

    if (matchingButton) {
      activateTabButton(matchingButton);
      tabGroups.add(parent);
    }
  });
};

export const setupSyncedTabs = () => {
  const selector = "[data-change-tab-btn], [data-change-code-tab-btn]";

  document.querySelectorAll<HTMLElement>(selector).forEach((button) => {
    if (button.dataset.syncedTabBound === "true") return;

    button.dataset.syncedTabBound = "true";
    button.addEventListener("click", () => {
      const dialect = getTabButtonDialect(button);

      if (dialect) {
        activateDialectTabs(dialect);
        updateDialectQueryParam(dialect);
        return;
      }

      activateTabButton(button);
    });
  });

  const urlDialect = normalizeDialectValue(
    new URLSearchParams(window.location.search).get(dialectParam),
  );

  if (urlDialect) {
    activateDialectTabs(urlDialect);
  }
};
