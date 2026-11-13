import { customSponsors } from "@/data/custom-sponsors";
import { rotateArrayDaily } from "@/utils";
import { type ISponsor } from "@/types";

interface AnchorProps {
  scrollOffset: number;
  anchors: {
    id: string;
    offsetTop: number;
  }[];
  scrollTop: number;
}

/** Headings must be in document order; return at most one active section. */
export function handleAnchorHighlighting({
  anchors,
  scrollTop,
  scrollOffset,
}: AnchorProps): string[] {
  let activeId: string | undefined;
  const sectionTop = Math.round(scrollTop + scrollOffset);

  for (const anchor of anchors) {
    // Browser scrolling rounds document positions to CSS pixels.
    if (Math.round(anchor.offsetTop) > sectionTop) {
      break;
    }

    activeId = anchor.id;
  }

  return activeId === undefined ? [] : [activeId];
}

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