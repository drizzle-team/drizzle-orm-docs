type DialectSwitcherItem = {
  id: string | null;
  name: string;
  path: string;
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
};

export const dialectSwitcherItems: DialectSwitcherItem[] = [
  {
    id: "pg",
    name: "PostgreSQL",
    path: "/docs/overview",
    icon: {
      light: {
        path: "/public/svg/postgresql.svg",
        style: {
          width: 18,
        },
      },
      dark: {
        path: "/public/svg/postgresql.svg",
        style: {
          width: 18,
          fill: "#f0f0f0",
        },
      },
    },
  },
  {
    id: "mysql",
    name: "MySQL",
    path: "/docs/mysql/overview",
    icon: {
      light: {
        path: "/public/svg/mysql.svg",
        style: {
          width: 18,
          fill: "#00546B",
        },
      },
      dark: {
        path: "/public/svg/mysql.svg",
        style: {
          width: 18,
          fill: "#F0F0F0",
        },
      },
    },
  },
  {
    id: "sqlite",
    name: "SQLite",
    path: "/docs/sqlite/overview",
    icon: {
      light: {
        path: "/public/svg/sqlite.svg",
        style: {
          width: 18,
        },
      },
      dark: {
        path: "/public/svg/sqlite.svg",
        style: {
          width: 18,
        },
      },
    },
  },
  {
    id: "singlestore",
    name: "SingleStore",
    path: "/docs/singlestore/overview",
    icon: {
      light: {
        path: "/public/svg/singlestore_light.svg",
        style: {
          width: 18,
        },
      },
      dark: {
        path: "/public/svg/singlestore_dark.svg",
        style: {
          width: 18,
        },
      },
    },
  },
  {
    id: "mssql",
    name: "MSSQL",
    path: "/docs/mssql/overview",
    icon: {
      light: {
        path: "/public/svg/mssql-light.png",
        style: {
          width: 20,
          borderRadius: "4px",
        },
      },
      dark: {
        path: "/public/svg/mssql-dark.png",
        style: {
          width: 20,
          borderRadius: "4px",
        },
      },
    },
  },
  {
    id: "cockroach",
    name: "CockroachDB",
    path: "/docs/cockroach/overview",
    icon: {
      light: {
        path: "/public/svg/cockroachdb-light.png",
        style: {
          width: 20,
          borderRadius: "4px",
        },
      },
      dark: {
        path: "/public/svg/cockroachdb-dark.png",
        style: {
          width: 20,
          borderRadius: "4px",
        },
      },
    },
  },
];
