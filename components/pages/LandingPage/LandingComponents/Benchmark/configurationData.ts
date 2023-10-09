const configurationData: {
  [key: string]: {
    value: string;
    items: {
      [id: string]: {
        value: string;
        description?: string;
        disabled?: boolean;
        config_info?: string;
        drizzle_version?: string;
        compare_version?: string;
      }
    } }
} = {
  orm: {
    value: 'ORM',
    items: {
      prisma: {
        value: 'Drizzle vs Prisma',
        config_info: 'Drizzle vs Prisma',
        drizzle_version: 'v0.28.1',
        compare_version: 'v5.1.1',
      },
      typeorm: {
        value: 'Drizzle vs TypeORM',
        config_info: 'Drizzle vs TypeORM',
        disabled: true,
      },
    },
  },
  traffic: {
    value: 'Traffic size',
    items: {
      '500vus': {
        value: 'Medium',
        description: '500VUs, 600k reqs',
        config_info: 'Medium traffic size(500VUs)',
      },
      '1000vus': {
        value: 'High',
        description: '1k VUs, 1M reqs',
        config_info: 'High traffic size(1000VUs)',
      },
      stepped: {
        value: 'Stepped',
        disabled: true,
      },
      spikes: {
        value: 'Traffic spikes',
        disabled: true,
      },
    },
  },
  dbSize: {
    value: 'Database size',
    items: {
      micro: {
        value: 'Micro',
        config_info: 'Micro database size',
      },
      s: {
        value: 'Small',
        disabled: true,
      },
      m: {
        value: 'Medium',
        disabled: true,
      },
      l: {
        value: 'Large',
        disabled: true,
      },
      xl: {
        value: 'Extra large',
        disabled: true,
      },
      xxl: {
        value: 'Extra extra large',
        disabled: true,
      },
    },
  },
  projectType: {
    value: 'Project type',
    items: {
      ecommerce: {
        value: 'E-commerce',
        config_info: 'E-commerce',
      },
      social: {
        value: 'Social with messaging',
        config_info: 'Social with messaging',
        disabled: true,
      },
    },
  },
  database: {
    value: 'Database',
    items: {
      postgres: {
        value: 'PostgreSQL',
        config_info: 'PostgreSQL',
      },
      mysql: {
        value: 'MySQL',
        disabled: true,
      },
      sqlite: {
        value: 'SQLite',
        disabled: true,
      },
      serverless_postgres: {
        value: 'Serverless PostgreSQL',
        disabled: true,
      },
      serverless_mysql: {
        value: 'Serverless MySQL',
        disabled: true,
      },
      serverless_sqlite: {
        value: 'Serverless SQLite',
        disabled: true,
      },
    },
  },
};

export default configurationData;
