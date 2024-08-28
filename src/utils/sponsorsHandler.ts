import sponsorsData from "@/data/s";
import { type ISponsor } from "@/types/Sponsors";

const sponsorsHandler = async () => {
  const response = await fetch("https://api.drizzle.team/v2/sponsors");
  const { sponsors } = await response.json();

  const allSponsors = [...sponsors, ...sponsorsData];
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
      items: [...hero],
    },
    {
      name: "gold",
      items: [...gold],
    },
    {
      name: "silver",
      items: [...silver],
    },
    {
      name: "bronze",
      items: [...bronze],
    },
    {
      name: "ramen",
      items: [...ramen],
    },
    {
      name: "coffee",
      items: [...coffee],
    },
    {
      name: "past",
      items: [...pastSponsors],
    },
  ];

  return arrays;
};

export default sponsorsHandler;
