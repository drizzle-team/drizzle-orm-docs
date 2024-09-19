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
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/get-started/mysql-new" },
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
        name: "PlanetsScale",
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/overview" },
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
        path: { existing: "/", new: "/docs/overview" },
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
