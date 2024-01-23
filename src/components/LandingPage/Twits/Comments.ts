import shalidev from "@/assets/images/twits/shalildev.jpg";
import aarondfrancis from "@/assets/images/twits/aarondfrancis.jpg";
import anthonysheww from "@/assets/images/twits/anthonysheww.jpg";
import imfelquis from "@/assets/images/twits/imfelquis.jpg";
import raynirola from "@/assets/images/twits/raynirola.jpg";
import t3dotgg from "@/assets/images/twits/t3dotgg.jpg";
import thdxr from "@/assets/images/twits/thdxr.jpg";
import tslamoon1 from "@/assets/images/twits/tslamoon1.jpg";
import lightgrey from "@/assets/images/twits/lightgrey.svg";
import adamdotdev from "@/assets/images/twits/adamdotdev.jpeg";

export interface IComment {
  avatar: ImageMetadata;
  name: string;
  login: string;
  text: string;
}

const Comments: IComment[] = [
  {
    avatar: thdxr,
    name: "Dax",
    login: "thdxr",
    text: "I hate Drizzle",
  },
  {
    avatar: lightgrey,
    name: "YouTube Commentor",
    login: "dont_know",
    text: "That was in PHP in 2007",
  },
  {
    avatar: anthonysheww,
    name: "Anthony Shew",
    login: "anthonysheww",
    text: "I hate @DrizzleOrm so much that I wrote the Auth.js adapter for it.",
  },
  {
    avatar: adamdotdev,
    name: "Adam",
    login: "adamdotdev",
    text: `i know this won't get me on the homepage, but 
    
@DrizzleORM is so good`,
  },
  {
    avatar: t3dotgg,
    name: "Theo",
    login: "t3dotgg",
    text: "Prisma is amazing",
  },
  {
    avatar: raynirola,
    name: "Ray",
    login: "_raynirola",
    text: 'DrizzleOrm is not an "ORM", it\'s merely a overrated typesafe sql wrapper, not even a query builder.',
  },
  {
    avatar: aarondfrancis,
    name: "Aaron Francis",
    login: "aarondfrancis",
    text: "Y'all should just copy everything Eloquent has",
  },
  {
    avatar: imfelquis,
    name: "Ofelquis Gimenes",
    login: "imfelquis",
    text: "unpredictable results is what feeds the human race, ban Drizzle now and all this typing gibberish all together",
  },
  {
    avatar: tslamoon1,
    name: "tslamoon",
    login: "tslamoon1",
    text: "I'll shave my head if drizzle adds MSSQL support by the end of September.",
  },
  {
    avatar: shalidev,
    name: "AZ",
    login: "shalildev",
    text: "What I notice is also an understandable API, text is a text, a primary value is primaryKey and so on",
  },
  {
    avatar: lightgrey,
    name: "Some Body",
    login: "dont_know",
    text: "Django had it in 2008",
  },
  {
    avatar: lightgrey,
    name: "Regular Twitter Comment",
    login: "dont_know",
    text: "It's not yet production ready",
  },
];

export { Comments };
