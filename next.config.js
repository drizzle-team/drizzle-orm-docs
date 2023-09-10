const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

// http://localhost:3000/docs/installation-and-db-connection/postgresql/postgresjs
// поискать по installation-and-db-connection, сделать ссылки на новое

const legacyRedirects = {};

module.exports = withNextra({
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.d\.ts$/,
      use: "raw-loader",
    });
    return config;
  },
  redirects: () => {
    return[
      { source: '/docs', destination: '/docs/overview', statusCode: 301 },
      {
        source: '/docs/quick-start',
        destination: '/docs/overview',
        statusCode: 301
      },
      {
        source: '/docs/crud',
        destination: '/docs/select',
        statusCode: 301
      },
      {
        source: '/docs/performance',
        destination: '/docs/perf-queries',
        statusCode: 301
      },
      {
        source: '/docs/installation-and-db-connection/postgresql/:path*',
        destination: '/docs/quick-postgresql/:path*',
        statusCode: 301
      },
      {
        source: '/docs/installation-and-db-connection/mysql/:path*',
        destination: '/docs/quick-mysql/:path*',
        statusCode: 301
      },
      {
        source: '/docs/installation-and-db-connection/sqlite/:path*',
        destination: '/docs/quick-sqlite/:path*',
        statusCode: 301
      },
      {
        source: '/kit-docs',
        destination: '/kit-docs/overview',
        statusCode: 301
      }
    ]    
  },
});
