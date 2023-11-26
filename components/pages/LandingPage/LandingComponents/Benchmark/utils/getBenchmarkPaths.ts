import { IParams } from '../types';

const paths = [
  {
    orm: 'prisma',
    dbSize: 'micro',
    projectType: 'ecommerce',
    database: 'postgres',
    traffic: 'your_startup',
    drizzleFileName: 'drizzle-startup',
    compareFileName: 'prisma-startup',
  },
  {
    orm: 'prisma',
    dbSize: 'micro',
    projectType: 'ecommerce',
    database: 'postgres',
    traffic: 'small',
    drizzleFileName: 'drizzle-500vus',
    compareFileName: 'prisma-500vus',
  },
  {
    orm: 'prisma',
    dbSize: 'micro',
    projectType: 'ecommerce',
    database: 'postgres',
    traffic: 'medium',
    drizzleFileName: 'drizzle-1000vus',
    compareFileName: 'prisma-1000vus',
  },
  {
    orm: 'prisma',
    dbSize: 'micro',
    projectType: 'ecommerce',
    database: 'postgres',
    traffic: 'micro',
    drizzleFileName: 'drizzle-200vus',
    compareFileName: 'prisma-200vus',
  },
];

const getBenchmarkPaths = (params: IParams) => {
  const {
    orm, dbSize, projectType, database, traffic,
  } = params;
  const foundPaths = paths.find(
    (path) => path.orm === orm
      && path.dbSize === dbSize
      && path.projectType === projectType
      && path.database === database
      && path.traffic === traffic,
  );
  if (!foundPaths) {
    return null;
  }
  return ({
    drizzleFileName: foundPaths.drizzleFileName,
    compareFileName: foundPaths.compareFileName,
  });
};

export default getBenchmarkPaths;
