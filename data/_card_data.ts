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
    description: 'Description',
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
    description: 'Description',
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
    description: 'Description',
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
    description: 'Description',
    href: './installation-and-db-connection/aws-data-api',
  },
};

export default data;
