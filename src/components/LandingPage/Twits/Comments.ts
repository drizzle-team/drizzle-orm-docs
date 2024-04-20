import aarondfrancis from "@/assets/images/twits/aarondfrancis.jpg";
import anthonysheww from "@/assets/images/twits/anthonysheww.jpg";
import imfelquis from "@/assets/images/twits/imfelquis.jpg";
import raynirola from "@/assets/images/twits/raynirola.jpg";
import t3dotgg from "@/assets/images/twits/t3dotgg.jpg";
import thdxr from "@/assets/images/twits/thdxr.jpg";
import tslamoon1 from "@/assets/images/twits/tslamoon1.jpg";
import lightgrey from "@/assets/images/twits/lightgrey.svg";
import adamdotdev from "@/assets/images/twits/adamdotdev.jpg";
import jamesrperkins from "@/assets/images/twits/james_r_perkins.jpg";
import saltyAom from "@/assets/images/twits/saltyAom.jpg";
import FredKSchott from "@/assets/images/twits/FredKSchott.jpg";
import JacobWolf from "@/assets/images/twits/JacobWolf.jpg";
import jamesrperkinsTwit from "@/assets/images/twits/jamesrperkinsTwit.png";
import saltyAomTwit from "@/assets/images/twits/saltyAomTwit.jpg";
import EddyVinckk from "@/assets/images/twits/EddyVinckk.jpg";
import chribjel from "@/assets/images/twits/chribjel.jpg";
import chribjelTwit from "@/assets/images/twits/chribjelTwit.png";

// Twit images

export interface IComment {
  avatar: ImportMeta;
  name: string;
  login: string;
  text: string;
  href?: string;
  twitImage?: ImportMetaEnv;
}

const Comments: IComment[] = [
  {
    avatar: thdxr,
    name: "Dax",
    login: "thdxr",
    text: "I hate Drizzle",
    href: "https://x.com/thdxr/status/1719129834901721353?s=20",
  },
  {
    avatar: anthonysheww,
    name: "Anthony Shew",
    login: "anthonysheww",
    text: "I hate @DrizzleOrm so much that I wrote the Auth.js adapter for it.",
    href: "https://x.com/anthonysheww/status/1688973391917969408?s=20",
  },
  {
    avatar: adamdotdev,
    name: "Adam",
    login: "adamdotdev",
    text: `i know this won't get me on the homepage, but 
    
@DrizzleORM is so good`,
    href: "https://x.com/adamdotdev/status/1749463315355508917?s=20",
  },
  {
    avatar: lightgrey,
    name: "Some Body",
    login: "dont_know",
    text: "Django had it in 2008",
  },
  {
    avatar: EddyVinckk,
    name: "Eddy Vinck",
    login: "EddyVinckk",
    text: `I love @DrizzleORM\n\nthat's it, that's the tweet`,
    href: "https://x.com/EddyVinckk/status/1770052528941478333?s=20",
  },
  {
    avatar: JacobWolf,
    name: "Jacob Wolf 🐝",
    login: "JacobWolf",
    text: "I love @DrizzleORM.",
    href: "https://x.com/JacobWolf/status/1768061278776349151?s=20",
  },
  {
    avatar: t3dotgg,
    name: "Theo",
    login: "t3dotgg",
    text: "Drizzle is the Tailwind of SQL",
    href: "https://x.com/t3dotgg/status/1702066193837027412?s=20",
  },
  {
    avatar: aarondfrancis,
    name: "Aaron Francis",
    login: "aarondfrancis",
    text: "Y'all should just copy everything Eloquent has",
    href: "https://x.com/aarondfrancis/status/1641145228189892613?s=20",
  },
  {
    avatar: imfelquis,
    name: "Ofelquis Gimenes",
    login: "imfelquis",
    text: "unpredictable results is what feeds the human race, ban Drizzle now and all this typing gibberish all together",
    href: "https://x.com/imfelquis/status/1709919386931462516?s=20",
  },
  {
    avatar: jamesrperkins,
    name: "James Perkins",
    login: "james_r_perkins",
    text: "Sorry @DrizzleORM you suck!",
    href: "https://x.com/james_r_perkins/status/1766156735155196201?s=20",
    twitImage: jamesrperkinsTwit,
  },
  {
    avatar: tslamoon1,
    name: "tslamoon",
    login: "tslamoon1",
    text: "I'll shave my head if drizzle adds MSSQL support by the end of September.",
    href: "https://x.com/tslamoon1/status/1700416378237530419?s=20",
  },
  {
    avatar: FredKSchott,
    name: "fks",
    login: "FredKSchott",
    text: "Astro DB is powered by Drizzle! ... and we regret everything omg this thing sucks",
    href: "https://x.com/FredKSchott/status/1767646959656194473?s=20",
  },
  {
    avatar: raynirola,
    name: "Ray",
    login: "_raynirola",
    text: 'DrizzleOrm is not an "ORM", it\'s merely a overrated typesafe sql wrapper, not even a query builder.',
    href: "https://x.com/_raynirola/status/1666028176789872642?s=20",
  },
  {
    avatar: saltyAom,
    name: "SaltyAom",
    login: "saltyAom",
    text: `Prisma Bun: 1.4 MB/s\nDrizzle Bun: 9.8 MB/s`,
    href: "https://x.com/saltyAom/status/1767783124342276526?s=20",
    twitImage: saltyAomTwit,
  },
  {
    avatar: chribjel,
    name: "Christoffer Bjelke",
    login: "chribjel",
    text: `How many times has this little shit snuck into your dependencies?`,
    href: "https://x.com/chribjel/status/1778851727954837727",
    twitImage: chribjelTwit,
  },
];

export { Comments };
