import { IParams } from '../types';

const paths = [
  {
    orm: 'prisma',
    dbSize: 'micro',
    projectType: 'ecommerce',
    database: 'postgres',
    traffic: '500vus',
    drizzleFileName: 'drizzle-500vus',
    compareFileName: 'prisma-500vus',
  },
  {
    orm: 'prisma',
    dbSize: 'micro',
    projectType: 'ecommerce',
    database: 'postgres',
    traffic: '1000vus',
    drizzleFileName: 'drizzle-1000vus',
    compareFileName: 'prisma-1000vus',
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
