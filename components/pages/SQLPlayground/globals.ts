const globals: {
  [key: string]: string
} = {
  sqlite: `
  import { drizzle } from 'drizzle-orm/better-sqlite3';
  declare global {
    const table: SQLiteTableWithColumns<{
      name: TTableName;
      columns: BuildColumns<TTableName, TColumnsMap>;
  }>;
    const db: BetterSQLite3Database
  }`,
  mysql: `import { MySql2Session } from 'drizzle-orm/mysql2';
  declare global {
    const table: : MySqlTableWithColumns<{
      name: TTableName;
      columns: BuildColumns<TTableName, TColumnsMap>;
  }>;
    const db: MySql2Database;
  }`,
  pg: `
  import { PgDatabase } from 'drizzle-orm/pg-core';
  declare global {
    const table: PgTableWithColumns<{
      name: TTableName;
      columns: BuildColumns<TTableName, TColumnsMap>;
  }>;
    const db: PostgresJsDatabase;
  }`,
};

export default globals;
