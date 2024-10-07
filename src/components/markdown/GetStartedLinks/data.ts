type GetStartedItems = {
  title: string;
  items: {
    name: string;
    path: {
      new: string;
      existing: string;
    };
    icon: {
      light: {
        path: string;
        style?: Record<string, any>;
      };
      dark: {
        path: string;
        style?: Record<string, any>;
      };
    };
  }[];
}[];

export const getStartedItems: GetStartedItems = [
  {
    title: "PostgreSQL",
    items: [
      {
        name: "PostgreSQL",
        path: {
          existing: "/docs/get-started/postgresql-existing",
          new: "/docs/get-started/postgresql-new",
        },
        icon: {
          light: {
            path: "/public/svg/postgresql.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/postgresql.svg",
            style: {
              width: 20,
              fill: "#f0f0f0",
            },
          },
        },
      },
      {
        name: "Neon",
        path: {
          existing: "/docs/get-started/neon-existing",
          new: "/docs/get-started/neon-new",
        },
        icon: {
          light: {
            path: "/public/svg/neon-light.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/neon-dark.svg",
            style: {
              width: 20,
            },
          },
        },
      },
      {
        name: "Vercel Postgres",
        path: {
          existing: "/docs/get-started/vercel-existing",
          new: "/docs/get-started/vercel-new",
        },
        icon: {
          light: {
            path: "/public/svg/vercel.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/vercel.svg",
            style: {
              width: 20,
              fill: "#000000",
            },
          },
        },
      },
      {
        name: "Supabase",
        path: {
          existing: "/docs/get-started/supabase-existing",
          new: "/docs/get-started/supabase-new",
        },
        icon: {
          light: {
            path: "/public/svg/supabase.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/supabase.svg",
            style: {
              width: 20,
            },
          },
        },
      },
      {
        name: "Xata",
        path: {
          existing: "/docs/get-started/xata-existing",
          new: "/docs/get-started/xata-new",
        },
        icon: {
          light: {
            path: "/public/svg/xata.svg",
            style: {
              width: 26,
            },
          },
          dark: {
            path: "/public/svg/xata.svg",
            style: {
              width: 26,
            },
          },
        },
      },
      {
        name: "PGLite",
        path: {
          existing: "/docs/get-started/pglite-existing",
          new: "/docs/get-started/pglite-new",
        },
        icon: {
          light: {
            path: "/public/svg/pglite.svg",
            style: {
              width: 26,
            },
          },
          dark: {
            path: "/public/svg/pglite.svg",
            style: {
              width: 26,
            },
          },
        },
      },
    ],
  },
  {
    title: "MySQL",
    items: [
      {
        name: "MySQL",
        path: {
          existing: "/docs/get-started/mysql-existing",
          new: "/docs/get-started/mysql-new",
        },
        icon: {
          light: {
            path: "/public/svg/mysql.svg",
            style: {
              width: 20,
              fill: "#00546B",
            },
          },
          dark: {
            path: "/public/svg/mysql.svg",
            style: {
              width: 20,
              fill: "#F0F0F0",
            },
          },
        },
      },
      {
        name: "PlanetScale",
        path: {
          existing: "/docs/get-started/planetscale-existing",
          new: "/docs/get-started/planetscale-new",
        },
        icon: {
          light: {
            path: "/public/svg/planetscale.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/planetscale.svg",
            style: {
              width: 20,
              color: "#f0f0f0",
            },
          },
        },
      },
      {
        name: "TiDB",
        path: {
          existing: "/docs/get-started/tidb-existing",
          new: "/docs/get-started/tidb-new",
        },
        icon: {
          light: {
            path: "/public/svg/tidb.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/tidb.svg",
            style: {
              width: 20,
            },
          },
        },
      },
    ],
  },
  {
    title: "SQLite",
    items: [
      {
        name: "SQLite",
        path: {
          existing: "/docs/get-started/sqlite-existing",
          new: "/docs/get-started/sqlite-new",
        },
        icon: {
          light: {
            path: "/public/svg/sqlite.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/sqlite.svg",
            style: {
              width: 20,
            },
          },
        },
      },
      {
        name: "Turso",
        path: {
          existing: "/docs/get-started/turso-existing",
          new: "/docs/get-started/turso-new",
        },
        icon: {
          light: {
            path: "/public/svg/new-turso.svg",
            style: {
              width: 26,
            },
          },
          dark: {
            path: "/public/svg/new-turso-light.svg",
            style: {
              width: 26,
            },
          },
        },
      },
      {
        name: "Cloudflare D1",
        path: {
          existing: "/docs/get-started/d1-existing",
          new: "/docs/get-started/d1-new",
        },
        icon: {
          light: {
            path: "/public/svg/cloudflare.svg",
            style: {
              width: 26,
            },
          },
          dark: {
            path: "/public/svg/cloudflare.svg",
            style: {
              width: 26,
            },
          },
        },
      },
      {
        name: "Bun SQLite",
        path: {
          existing: "/docs/get-started/bun-sqlite-existing",
          new: "/docs/get-started/bun-sqlite-new",
        },
        icon: {
          light: {
            path: "/public/svg/bun.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/bun.svg",
            style: {
              width: 20,
            },
          },
        },
      },
    ],
  },
  {
    title: "Native SQLite",
    items: [
      {
        name: "Expo SQLite",
        path: {
          existing: "/docs/get-started/expo-existing",
          new: "/docs/get-started/expo-new",
        },
        icon: {
          light: {
            path: "/public/svg/expo.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/expo.svg",
            style: {
              width: 20,
            },
          },
        },
      },
      {
        name: "OP SQLite",
        path: {
          existing: "/docs/get-started/op-sqlite-existing",
          new: "/docs/get-started/op-sqlite-new",
        },
        icon: {
          light: {
            path: "/public/svg/opsqlite.png",
            style: {
              width: "20px",
              borderRadius: "4px",
            },
          },
          dark: {
            path: "/public/svg/opsqlite.png",
            style: {
              width: "20px",
              borderRadius: "4px",
            },
          },
        },
      },
    ],
  },
];
