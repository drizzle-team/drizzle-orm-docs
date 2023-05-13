const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

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
    ];
  },
})
