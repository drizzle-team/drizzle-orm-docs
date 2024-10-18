import type { ISupportingElement } from "@/types/Supporting";

const Databases: {
  [key: string]: ISupportingElement;
} = {
  Neon: {
    imageSrc: {
      lightThemeSrc: "/public/svg/neon-light.svg",
      darkThemeSrc: "/public/svg/neon-dark.svg",
    },
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    sponsorUrl: "https://driz.link/neon",
  },
  PlanetScale: {
    imageSrc: "/public/svg/planetscale.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
      color: "#f0f0f0",
    },
  },
  "Vercel Postgres": {
    imageSrc: "/public/svg/vercel.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      fill: "#000000",
      width: 24,
    },
  },
  Turso: {
    imageSrc: {
      lightThemeSrc: "/public/svg/new-turso.svg",
      darkThemeSrc: "/public/svg/new-turso-light.svg",
    },
    lightStyle: {
      width: 32,
    },
    darkStyle: {
      width: 32,
    },
    sponsorUrl: "https://driz.link/turso",
  },
  Xata: {
    imageSrc: "/public/svg/xata.svg",
    lightStyle: {
      width: 32,
    },
    darkStyle: {
      width: 32,
    },
    sponsorUrl: "https://driz.link/xataio",
  },
  Supabase: {
    imageSrc: "/public/svg/supabase.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
  },
  PostgreSQL: {
    imageSrc: "/public/svg/postgresql.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
      fill: "#f0f0f0",
    },
  },
  MySQL: {
    imageSrc: "/public/svg/mysql.svg",
    lightStyle: {
      width: 24,
      fill: "#00546B",
    },
    darkStyle: {
      width: 24,
      fill: "#F0F0F0",
    },
  },
  SQLite: {
    imageSrc: "/public/svg/sqlite.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
  },
  "Web SQLite": {
    imageSrc: "/public/svg/database.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
  },
  LiteFS: {
    imageSrc: "/public/svg/flyio.svg",
    lightStyle: {
      width: 28,
    },
    darkStyle: {
      width: 28,
    },
  },
  TiDB: {
    imageSrc: "/public/svg/tidb.svg",
    lightStyle: {
      width: 28,
    },
    darkStyle: {
      width: 28,
    },
    sponsorUrl: "https://driz.link/silver-sponsor-tidb",
  },
  Tembo: {
    imageSrc: "/public/images/tembo.png",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    sponsorUrl: "https://driz.link/tembo",
  },
  EdgeDB: {
    imageSrc: {
      lightThemeSrc: "/public/svg/edb_logo_small.svg",
      darkThemeSrc: "/public/svg/edb_logo_small.svg",
    },
    lightStyle: {
      width: 26,
    },
    darkStyle: {
      width: 26,
    },
    sponsorUrl: "https://driz.link/edgedb",
  },
};

export default Databases;
