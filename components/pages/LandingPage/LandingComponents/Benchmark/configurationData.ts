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
      your_startup: {
        value: 'Your startup',
        description: '0 users and 0 requests',
        config_info: 'Your startup(0 users)',
      },
      micro: {
        value: 'Micro',
        description: '200VUs, 240k reqs',
        config_info: 'Micro traffic size(200VUs)',
      },
      small: {
        value: 'Small',
        description: '500VUs, 600k reqs',
        config_info: 'Small traffic size(500VUs)',
      },
      medium: {
        value: 'Medium',
        description: '1k VUs, 1M reqs',
        config_info: 'Medium traffic size(1000VUs)',
      },
      high: {
        value: 'High',
        disabled: true,
      },
      huge: {
        value: 'Huge',
        disabled: true,
      },
      extreme: {
        value: 'Extreme',
        disabled: true,
      },
      blackFriday: {
        value: 'Black Friday',
        disabled: true,
      },
    },
  },
  dbSize: {
    value: 'Database size',
    items: {
      micro: {
        value: 'Micro',
        description: '43mb',
        config_info: 'Micro database size',
      },
      small: {
        value: 'Small',
        disabled: true,
      },
      medium: {
        value: 'Medium',
        disabled: true,
      },
      large: {
        value: 'Large',
        disabled: true,
      },
      huge: {
        value: 'Huge',
        disabled: true,
      },
      extreme: {
        value: 'Extreme',
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
      geo: {
        value: 'Geo queries heavy',
        disabled: true,
      },
      analytics: {
        value: 'Analytics with time series',
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
