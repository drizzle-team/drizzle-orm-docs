const data: {
  value: string;
  key: string;
  items: {
    id: string;
    value: string;
    description?: string;
    disabled?: boolean;
  }[];
}[] = [
  {
    value: 'Traffic size',
    key: 'traffic',
    items: [
      {
        id: '500vus',
        value: 'Medium',
        description: '500VUs, 600k reqs',
      },
      {
        id: '1000vus',
        value: 'High',
        description: '1k VUs, 1M reqs',
      },
      {
        id: 'stepped',
        value: 'Stepped',
        disabled: true,
      },
      {
        id: 'spikes',
        value: 'Traffic spikes',
        disabled: true,
      },
    ],
  },
  {
    value: 'Database size',
    key: 'dbSize',
    items: [
      {
        id: 'm',
        value: 'Medium',
      },
      {
        id: 'l',
        value: 'Large',
        disabled: true,
      },
      {
        id: 'xl',
        value: 'Extra large',
        disabled: true,
      },
      {
        id: 'xxl',
        value: 'Extra extra large',
        disabled: true,
      },
    ],
  },
  {
    value: 'Project type',
    key: 'projectType',
    items: [
      {
        id: 'ecommerce',
        value: 'E-commerce',
      },
      {
        id: 'social',
        value: 'Social with messaging',
        disabled: true,
      },
    ],
  },
  {
    value: 'Database',
    key: 'database',
    items: [
      {
        id: 'postgres',
        value: 'PostgreSQL',
      },
      {
        id: 'mysql',
        value: 'MySQL',
        disabled: true,
      },
      {
        id: 'sqlite',
        value: 'SQLite',
        disabled: true,
      },
      {
        id: 'serverless postgres',
        value: 'Serverless PostgreSQL',
        disabled: true,
      },
      {
        id: 'serverless mysql',
        value: 'Serverless MySQL',
        disabled: true,
      },
      {
        id: 'serverless sqlite',
        value: 'Serverless SQLite',
        disabled: true,
      },
    ],
  },

];

export default data;
