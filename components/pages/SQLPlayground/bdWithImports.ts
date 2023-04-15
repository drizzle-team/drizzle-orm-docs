const bdWithImports: {
  [key: string]: {
    importFunc: () => Promise<any>,
    packages: Array<() => Promise<any>>,
    types: string[]
  };
} = {
  mysql: {
    importFunc: () => import('drizzle-orm/mysql2'),
    packages: [() => import('drizzle-orm/mysql-core')],
    types: ['drizzle-orm/mysql-core', 'drizzle-orm/mysql2'],
  },
  pg: {
    importFunc: () => import('drizzle-orm/postgres-js'),
    packages: [() => import('drizzle-orm/pg-core')],
    types: ['drizzle-orm/pg-core', 'drizzle-orm/postgres-js'],
  },
  sqlite: {
    importFunc: () => import('drizzle-orm/better-sqlite3'),
    packages: [() => import('drizzle-orm/sqlite-core')],
    types: ['drizzle-orm/sqlite-core', 'drizzle-orm/better-sqlite3'],
  },
};

export default bdWithImports;
