import { ICards } from '../@types/SVGTypes';

export const pgDrivers: ICards = {
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
    href: '/docs/installation-and-db-connection/postgresql/postgresjs',
  },
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
    href: '/docs/installation-and-db-connection/postgresql/node-postgres',
  },
};

export const pgDatabases: ICards = {
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
    href: '/docs/installation-and-db-connection/postgresql/neon',
  },
  vercel: {
    title: 'Vercel Postgres',
    image: 'vercel',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
    description: 'Serverless SQL database designed to integrate with Vercel Functions',
    href: '/docs/installation-and-db-connection/postgresql/vercel',
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
    href: '/docs/installation-and-db-connection/postgresql/aws-data-api',
  },
};

export const mysql: ICards = {
  planetscale: {
    title: 'PlanetScale',
    image: 'planetscale',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
      fill: '#f0f0f0',
    },
    description: 'World\'s most advanced serverless MySQL platform',
    href: '/docs/installation-and-db-connection/mysql/planetscale',
  },
  mysql2: {
    title: 'MySQL 2',
    image: 'server',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
    description: 'MySQL client for Node.js with focus on performance',
    href: '/docs/installation-and-db-connection/mysql/mysql2',
  },
};

export const sqlite: ICards = {
  turso: {
    title: 'Turso',
    image: 'turso',
    lightIcon: {
      width: 28,
      src: '/svg/turso-light.svg',
    },
    darkIcon: {
      width: 28,
    },
    description: 'Turso is an edge SQLite database',
    href: '/docs/installation-and-db-connection/sqlite/turso',
  },
  cloudflared1: {
    title: 'Cloudflare D1',
    image: 'database',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
    description: 'D1 is Cloudflare\'s first queryable relational database',
    href: '/docs/installation-and-db-connection/sqlite/d1',
  },
  bun: {
    title: 'Bun SQLite',
    image: 'bun',
    lightIcon: {
      width: 32,
    },
    darkIcon: {
      width: 32,
    },
    description: 'Fast all-in-one JavaScript runtime',
    href: '/docs/installation-and-db-connection/sqlite/bun',
  },
  better: {
    title: 'better-sqlite3',
    image: 'server',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
    description: 'Library for SQLite3 in Node.js',
    href: '/docs/installation-and-db-connection/sqlite/better-sqlite3',
  },
  http: {
    title: 'SQLite HTTP proxy',
    image: 'server',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
    description: 'SQLite3 HTTP proxy implementation',
    href: '/docs/installation-and-db-connection/sqlite/http-proxy',
  },
};
