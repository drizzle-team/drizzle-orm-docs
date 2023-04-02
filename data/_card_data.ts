import { ICards } from '../@types/SVGTypes';

const data: ICards = {
  'node-postgres': {
    title: 'node-postgres',
    image: 'server',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
    description: 'Collection of nodejs modules to interact with PostgreSQL',
    href: './installation-and-db-connection/node-postgres',
  },
  postgresjs: {
    title: 'Postgres.JS',
    image: 'postgres-js',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
      fill: '#f0f0f0',
    },
    description: 'Fastest full featured PostgreSQL client for Node.js and Deno',
    href: './installation-and-db-connection/postgresjs',
  },
  'aws-data-api': {
    title: 'AWS Data API',
    image: 'database',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
    description: 'Data API for AWS Aurora Serverless',
    href: './installation-and-db-connection/aws-data-api',
  },
  neon: {
    title: 'Neon',
    image: 'neon-serverless',
    lightIcon: {
      width: 24,
      src: '/svg/neon-light.svg',
    },
    darkIcon: {
      width: 24,
      src: '/svg/neon-dark.svg',
    },
    description: 'Serverless multi-cloud fully managed Postgres',
    href: './installation-and-db-connection/neon',
  },
};

export default data;
