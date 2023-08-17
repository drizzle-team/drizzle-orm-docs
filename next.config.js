const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

// http://localhost:3000/docs/installation-and-db-connection/postgresql/postgresjs
const legacyRedirects = {
  
}

module.exports = withNextra({
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.d\.ts$/,
      use: 'raw-loader',
    });
    return config;
  },
  redirects: () => {
    return [
      {
        source: "/docs",
        destination: "/docs/quick-start",
        statusCode: 301,
      },
      {
        source: "/kit-docs",
        destination: "/kit-docs/overview",
        statusCode: 301,
      },
    ];
  },
})
