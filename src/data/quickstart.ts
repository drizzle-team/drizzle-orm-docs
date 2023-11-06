import type { ICards } from "@/types/SVGTypes";

export const pg: ICards = {
  neon: {
    title: "Neon",
    imageSrc: {
      darkThemeSrc: "/public/svg/neon-dark.svg",
      lightThemeSrc: "/public/svg/neon-light.svg",
    },
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "Serverless multi-cloud fully managed Postgres",
    href: "/docs/quick-postgresql/neon",
  },
  vercel: {
    title: "Vercel Postgres",
    imageSrc: "/public/svg/vercel.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description:
      "Serverless SQL database designed to integrate with Vercel Functions",
    href: "/docs/quick-postgresql/vercel",
  },
  Supabase: {
    title: "Supabase",
    imageSrc: "/public/svg/supabase.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description:
      "Open source Firebase alternative for building secure and performant Postgres backends",
    href: "/docs/quick-postgresql/supabase",
  },
  postgresjs: {
    title: "Postgres.JS",
    imageSrc: "/public/svg/postgres-js.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
      fill: "#f0f0f0",
    },
    description: "Fastest full featured PostgreSQL client for Node.js and Deno",
    href: "/docs/quick-postgresql/postgresjs",
  },
  "aws-data-api": {
    title: "AWS Data API",
    imageSrc: "/public/svg/database.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "Data API for AWS Aurora Serverless",
    href: "/docs/quick-postgresql/aws-data-api",
  },
  http: {
    title: "HTTP proxy",
    imageSrc: "/public/svg/server.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "PostgreSQL HTTP proxy implementation",
    href: "/docs/quick-postgresql/http-proxy",
  },
  "node-postgres": {
    title: "node-postgres",
    imageSrc: "/public/svg/server.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "Collection of nodejs modules to interact with PostgreSQL",
    href: "/docs/quick-postgresql/node-postgres",
  },
};

export const mysql: ICards = {
  planetscale: {
    title: "PlanetScale",
    imageSrc: "/public/svg/planetscale.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
      fill: "#f0f0f0",
    },
    description: "World's most advanced serverless MySQL platform",
    href: "/docs/quick-mysql/planetscale",
  },
  mysql2: {
    title: "MySQL 2",
    imageSrc: "/public/svg/server.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "MySQL client for Node.js with focus on performance",
    href: "/docs/quick-mysql/mysql2",
  },
  http: {
    title: "MySQL HTTP proxy",
    imageSrc: "/public/svg/server.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "MySQL HTTP proxy implementation",
    href: "/docs/quick-mysql/http-proxy",
  },
};

export const sqlite: ICards = {
  turso: {
    title: "Turso",
    imageSrc: {
      darkThemeSrc: "/public/svg/turso.svg",
      lightThemeSrc: "/public/svg/turso-light.svg",
    },
    lightStyle: {
      width: 28,
    },
    darkStyle: {
      width: 28,
    },
    description: "Turso is an edge SQLite database",
    href: "/docs/quick-sqlite/turso",
  },
  cloudflared1: {
    title: "Cloudflare D1",
    imageSrc: "/public/svg/cloudflareworker.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "D1 is Cloudflare's first queryable relational database",
    href: "/docs/quick-sqlite/d1",
  },
  bun: {
    title: "Bun SQLite",
    imageSrc: "/public/svg/bun.svg",
    lightStyle: {
      width: 32,
    },
    darkStyle: {
      width: 32,
    },
    description: "Fast all-in-one JavaScript runtime",
    href: "/docs/quick-sqlite/bun",
  },
  better: {
    title: "better-sqlite3",
    imageSrc: "/public/svg/server.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "Library for SQLite3 in Node.js",
    href: "/docs/quick-sqlite/better-sqlite3",
  },
  http: {
    title: "SQLite HTTP proxy",
    imageSrc: "/public/svg/server.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "SQLite3 HTTP proxy implementation",
    href: "/docs/quick-sqlite/http-proxy",
  },
};
