export type Benchmarks = {
  query: string;
  tests: {
    name: string;
    time: number;
  }[]
};

export type BenchmarksWithType = {
  type: string;
  benchmarks: Benchmarks[];
}[];

const data: BenchmarksWithType = [
  {
    type: 'sqlite',
    benchmarks: [
      {
        query: 'select * from customer',
        tests: [{
          name: 'drizzle:p',
          time: 0.1269,
        },
        {
          name: 'drizzle',
          time: 0.1493,
        },
        {
          name: 'typeorm',
          time: 0.6961,
        },
        {
          name: 'prisma',
          time: 0.74131,
        },
        ],
      },
      {
        query: 'select * from customer where id = ?',
        tests: [{
          name: 'drizzle:p',
          time: 0.76558,
        },
        {
          name: 'drizzle',
          time: 2.74,
        },
        {
          name: 'typeorm',
          time: 8.19,
        },
        {
          name: 'prisma',
          time: 12.08,
        },
        ],
      },
      {
        query: 'select * from customer where company_name like ?',
        tests: [{
          name: 'drizzle:p',
          time: 1.75,
        },
        {
          name: 'drizzle',
          time: 2.07,
        },
        {
          name: 'typeorm',
          time: 7.57,
        },
        {
          name: 'prisma',
          time: 11.17,
        },
        ],
      },
      {
        query: 'SELECT * FROM employee',
        tests: [{
          name: 'drizzle:p',
          time: 0.02771,
        },
        {
          name: 'drizzle',
          time: 0.063,
        },
        {
          name: 'typeorm',
          time: 0.16219,
        },
        {
          name: 'prisma',
          time: 0.2,
        },
        ],
      },
      {
        query: 'select * from employee where id = ? left join reportee',
        tests: [{
          name: 'drizzle:p',
          time: 0.122,
        },
        {
          name: 'drizzle',
          time: 0.810,
        },
        {
          name: 'typeorm',
          time: 2.67,
        },
        {
          name: 'prisma',
          time: 2.28,
        },
        ],
      },
      {
        query: 'SELECT * FROM supplier',
        tests: [{
          name: 'drizzle:p',
          time: 0.04657,
        },
        {
          name: 'drizzle',
          time: 0.0655,
        },
        {
          name: 'typeorm',
          time: 257,
        },
        {
          name: 'prisma',
          time: 282,
        },
        ],
      },
      {
        query: 'select * from supplier where id = ?',
        tests: [{
          name: 'drizzle:p',
          time: 0.236,
        },
        {
          name: 'drizzle',
          time: 0.819,
        },
        {
          name: 'typeorm',
          time: 2.24,
        },
        {
          name: 'prisma',
          time: 3.69,
        },
        ],
      },
      {
        query: 'SELECT * FROM product',
        tests: [{
          name: 'drizzle:p',
          time: 0.092,
        },
        {
          name: 'drizzle',
          time: 0.110,
        },
        {
          name: 'typeorm',
          time: 0.499,
        },
        {
          name: 'prisma',
          time: 0.557,
        },
        ],
      },
      {
        query: 'SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?',
        tests: [{
          name: 'drizzle:p',
          time: 0.486,
        },
        {
          name: 'drizzle',
          time: 3.87,
        },
        {
          name: 'typeorm',
          time: 8.44,
        },
        {
          name: 'prisma',
          time: 13.43,
        },
        ],
      },
      {
        query: 'SELECT * FROM product WHERE product.name LIKE ?',
        tests: [{
          name: 'drizzle:p',
          time: 1.45,
        },
        {
          name: 'drizzle',
          time: 1.94,
        },
        {
          name: 'typeorm',
          time: 6.18,
        },
        {
          name: 'prisma',
          time: 9.61,
        },
        ],
      },
      {
        query: 'select all order with sum and count',
        tests: [{
          name: 'drizzle:p',
          time: 132.6,
        },
        {
          name: 'drizzle',
          time: 132.51,
        },
        {
          name: 'typeorm',
          time: 6560,
        },
        {
          name: 'prisma',
          time: 3960,
        },
        ],
      },
      {
        query: 'SELECT * FROM order_detail WHERE order_id = ?',
        tests: [{
          name: 'drizzle:p',
          time: 19.4,
        },
        {
          name: 'drizzle',
          time: 25.82,
        },
        {
          name: 'typeorm',
          time: 87.94,
        },
        {
          name: 'prisma',
          time: 91.78,
        },
        ],
      },
    ],
  },
  {
    type: 'postgres',
    benchmarks: [
      {
        query: 'select * from customer',
        tests: [{
          name: 'drizzle:p',
          time: 0.695,
        },
        {
          name: 'drizzle',
          time: 0.708,
        },
        {
          name: 'typeorm',
          time: 0.900,
        },
        {
          name: 'prisma',
          time: 1.48,
        },
        ],
      },
      {
        query: 'select * from customer where id = ?',
        tests: [{
          name: 'drizzle:p',
          time: 42.94,
        },
        {
          name: 'drizzle',
          time: 48.13,
        },
        {
          name: 'typeorm',
          time: 50.6,
        },
        {
          name: 'prisma',
          time: 58.38,
        },
        ],
      },
      {
        query: 'select * from customer where company_name like ?',
        tests: [{
          name: 'drizzle:p',
          time: 29.85,
        },
        {
          name: 'drizzle',
          time: 27.5,
        },
        {
          name: 'typeorm',
          time: 31.56,
        },
        {
          name: 'prisma',
          time: 90.36,
        },
        ],
      },
      {
        query: 'SELECT * FROM employee',
        tests: [{
          name: 'drizzle:p',
          time: 0.598,
        },
        {
          name: 'drizzle',
          time: 0.529,
        },
        {
          name: 'typeorm',
          time: 0.575,
        },
        {
          name: 'prisma',
          time: 0.751,
        },
        ],
      },
      {
        query: 'select * from employee where id = ? left join reportee',
        tests: [{
          name: 'drizzle:p',
          time: 5.15,
        },
        {
          name: 'drizzle',
          time: 6.38,
        },
        {
          name: 'typeorm',
          time: 10.68,
        },
        {
          name: 'prisma',
          time: 9.44,
        },
        ],
      },
      {
        query: 'SELECT * FROM supplier',
        tests: [{
          name: 'drizzle:p',
          time: 0.644,
        },
        {
          name: 'drizzle',
          time: 0.642,
        },
        {
          name: 'typeorm',
          time: 0.610,
        },
        {
          name: 'prisma',
          time: 0.802,
        },
        ],
      },
      {
        query: 'select * from supplier where id = ?',
        tests: [{
          name: 'drizzle:p',
          time: 14.49,
        },
        {
          name: 'drizzle',
          time: 14.9,
        },
        {
          name: 'typeorm',
          time: 16.69,
        },
        {
          name: 'prisma',
          time: 16.81,
        },
        ],
      },
      {
        query: 'SELECT * FROM product',
        tests: [{
          name: 'drizzle:p',
          time: 0.716,
        },
        {
          name: 'drizzle',
          time: 0.715,
        },
        {
          name: 'typeorm',
          time: 0.851,
        },
        {
          name: 'prisma',
          time: 1.06,
        },
        ],
      },
      {
        query: 'SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?',
        tests: [{
          name: 'drizzle:p',
          time: 40.57,
        },
        {
          name: 'drizzle',
          time: 47.43,
        },
        {
          name: 'typeorm',
          time: 96.51,
        },
        {
          name: 'prisma',
          time: 142.41,
        },
        ],
      },
      {
        query: 'SELECT * FROM product WHERE product.name LIKE ?',
        tests: [{
          name: 'drizzle:p',
          time: 28.1,
        },
        {
          name: 'drizzle',
          time: 29.39,
        },
        {
          name: 'typeorm',
          time: 31.35,
        },
        {
          name: 'prisma',
          time: 68.54,
        },
        ],
      },
      {
        query: 'select all order with sum and count',
        tests: [{
          name: 'drizzle:p',
          time: 2.65,
        },
        {
          name: 'drizzle',
          time: 2.94,
        },
        {
          name: 'typeorm',
          time: 14.97,
        },
        {
          name: 'prisma',
          time: 40.63,
        },
        ],
      },
      {
        query: 'select order with sum and count using limit with offset',
        tests: [{
          name: 'drizzle:p',
          time: 39.23,
        },
        {
          name: 'drizzle',
          time: 42.22,
        },
        {
          name: 'typeorm',
          time: 70.71,
        },
        {
          name: 'prisma',
          time: 73.46,
        },
        ],
      },
      {
        query: 'select order where order.id = ? with sum and count',
        tests: [{
          name: 'drizzle:p',
          time: 23.75,
        },
        {
          name: 'drizzle',
          time: 28.96,
        },
        {
          name: 'typeorm',
          time: 43.57,
        },
        {
          name: 'prisma',
          time: 65.84,
        },
        ],
      },
      {
        query: 'SELECT * FROM order_detail WHERE order_id = ?',
        tests: [{
          name: 'drizzle:p',
          time: 129.02,
        },
        {
          name: 'drizzle',
          time: 163.52,
        },
        {
          name: 'typeorm',
          time: 223.47,
        },
        {
          name: 'prisma',
          time: 555.24,
        },
        ],
      },
    ],
  },
];

export default data;
