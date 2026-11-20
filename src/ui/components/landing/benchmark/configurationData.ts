const configurationData = {
  orm: {
    value: "ORM",
    items: {
      "go-20261120": {
        value: "Drizzle v1.0.0-rc.6 vs Go v1.27.4",
        config_info: "Drizzle v1.0.0-rc.6 vs Go v1.27.4",
        drizzle_version: "v1.0.0-rc.6",
        compare_version: "v1.27.4",
      },
      "prisma-v8.0.0-rc.33-20261120": {
        value: "Drizzle v1.0.0-rc.6 vs Prisma v8.0.0-rc.33",
        config_info:
          "Drizzle v1.0.0-rc.6 (Drizzle driver) vs Prisma v8.0.0-rc.33 (node-postgres)",
        drizzle_version: "v1.0.0-rc.6",
        compare_version: "v8.0.0-rc.33",
      },
      "prisma-v7.10.1-20261120": {
        value: "Drizzle v1.0.0-rc.6 vs Prisma v7.10.1",
        config_info:
          "Drizzle v1.0.0-rc.6 (Drizzle driver) vs Prisma v7.10.1 (node-postgres)",
        drizzle_version: "v1.0.0-rc.6",
        compare_version: "v7.10.1",
      },
    },
  },
  dbSize: {
    value: "Database size",
    items: {
      micro: {
        value: "Micro",
        description: "43mb",
        config_info: "Micro database size",
      },
      small: {
        value: "Small",
        disabled: true,
        config_info: "Small database size",
      },
      medium: {
        value: "Medium",
        disabled: true,
        config_info: "Medium database size",
      },
      large: {
        value: "Large",
        disabled: true,
        config_info: "Large database size",
      },
      huge: {
        value: "Huge",
        disabled: true,
        config_info: "Huge database size",
      },
      extreme: {
        value: "Extreme",
        disabled: true,
        config_info: "Extreme database size",
      },
    },
  },
  projectType: {
    value: "Project type",
    items: {
      ecommerce: {
        value: "E-commerce",
        config_info: "E-commerce",
      },
      social: {
        value: "Social with messaging",
        config_info: "Social with messaging",
        disabled: true,
      },
      geo: {
        value: "Geo queries heavy",
        config_info: "Geo queries heavy",
        disabled: true,
      },
      analytics: {
        value: "Analytics with time series",
        config_info: "Analytics with time series",
        disabled: true,
      },
    },
  },
  database: {
    value: "Database",
    items: {
      postgres: {
        value: "PostgreSQL",
        config_info: "PostgreSQL",
      },
      mysql: {
        value: "MySQL",
        config_info: "MySQL",
        disabled: true,
      },
      sqlite: {
        value: "SQLite",
        config_info: "SQLite",
        disabled: true,
      },
      serverless_postgres: {
        value: "Serverless PostgreSQL",
        config_info: "Serverless PostgreSQL",
        disabled: true,
      },
      serverless_mysql: {
        value: "Serverless MySQL",
        config_info: "Serverless MySQL",
        disabled: true,
      },
      serverless_sqlite: {
        value: "Serverless SQLite",
        config_info: "Serverless SQLite",
        disabled: true,
      },
    },
  },
} as const;

export default configurationData;
