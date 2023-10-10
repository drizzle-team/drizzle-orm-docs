export interface IComment {
  avatar: string,
  name: string,
  login: string,
  text: string,
}

const TopThreeComments: IComment[] = [
  {
    avatar: 'https://pbs.twimg.com/profile_images/1602333093485891584/mmVqjFNI_normal.jpg',
    name: 'Dax',
    login: 'thdxr',
    text: 'I hate Drizzle',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1567269493608714241/6ACZo99k_normal.jpg',
    name: 'Kent C. Dodds',
    login: 'kentcdodds',
    text: 'Prisma is still an awesome choice. I\'m not going anywhere',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1605762947686375425/lsoGWWty_normal.jpg',
    name: 'Theo',
    login: 't3dotgg',
    text: 'Prisma is amazing',
  },
];

const Comments: IComment[] = [
  {
    avatar: 'https://pbs.twimg.com/profile_images/1602333093485891584/mmVqjFNI_normal.jpg',
    name: 'Dax',
    login: 'thdxr',
    text: 'I hate Drizzle',
  },
  {
    avatar: 'https://placehold.co/100x100/lightgrey/lightgrey',
    name: 'YouTube Commentor',
    login: 'dont_know',
    text: 'That was in PHP in 2007',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1664871184155185152/aqt7wx77_normal.jpg',
    name: 'Anthony Shew',
    login: 'anthonysheww',
    text: 'I hate @DrizzleOrm so much that I wrote the Auth.js adapter for it.',
  },
  {
    avatar: 'https://placehold.co/100x100/lightgrey/lightgrey',
    name: 'Regular Twitter Comment',
    login: 'dont_know',
    text: 'It\'s not yet production ready',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1605762947686375425/lsoGWWty_normal.jpg',
    name: 'Theo',
    login: 't3dotgg',
    text: 'Prisma is amazing',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1535515556643606529/RRGbBC6T_normal.jpg',
    name: 'Ray',
    login: '_raynirola',
    text: 'DrizzleOrm is not an "ORM", it\'s merely a overrated typesafe sql wrapper, not even a query builder.',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1503487031330197518/J4i7ofgt_normal.jpg',
    name: 'Aaron Francis',
    login: 'aarondfrancis',
    text: 'Y\'all should just copy everything Eloquent has',
  },
  {
    avatar: 'https://placehold.co/100x100/lightgrey/lightgrey',
    name: 'Some Body',
    login: 'dont_know',
    text: 'Django had it in 2008',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1679868769584447489/cbEZlJOP_x96.jpg',
    name: 'tslamoon',
    login: 'tslamoon1',
    text: "I'll shave my head if drizzle adds MSSQL support by the end of September.",
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1629755042612887552/k4-mlreC_x96.jpg',
    name: 'AZ',
    login: 'shalildev',
    text: 'What I notice is also an understandable API, text is a text, a primary value is primaryKey and so on',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1689960573683863552/FuuDSnJi_x96.jpg',
    name: 'Ofelquis Gimenes',
    login: 'imfelquis',
    text: 'unpredictable results is what feeds the human race, ban Drizzle now and all this typing gibberish all together',
  },
];

export { TopThreeComments, Comments };
