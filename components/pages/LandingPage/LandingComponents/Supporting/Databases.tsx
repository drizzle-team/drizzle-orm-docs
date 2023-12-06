import { ISupportingElement } from '@/@types/Supporting';

const Databases: {
  [key: string]: ISupportingElement,
} = {
  Neon: {
    src: 'neon-light.svg',
    srcDark: 'neon-dark.svg',
    lightStyles: {
      width: 24,
    },
    darkStyles: {
      width: 24,
    },
    sponsorUrl: 'https://driz.li/neon',
  },
  PlanetScale: {
    src: 'planetscale.svg',
    lightStyles: {
      width: 24,
    },
    darkStyles: {
      width: 24,
      color: '#f0f0f0',
    },
  },
  'Vercel Postgres': {
    src: 'vercel.svg',
    lightStyles: {
      width: 32,
    },
    darkStyles: {
      fill: '#000000',
      width: 32,
    },
  },
  Turso: {
    src: 'turso.svg',
    lightStyles: {
      width: 28,
      src: '/svg/turso-light.svg',
    },
    darkStyles: {
      width: 28,
    },
    sponsorUrl: 'https://driz.li/turso',
  },
  Xata: {
    src: 'xata.svg',
    lightStyles: {
      width: 32,
    },
    darkStyles: {
      width: 32,
    },
    sponsorUrl: 'https://driz.li/xataio',
  },
  Supabase: {
    src: 'supabase.svg',
    lightStyles: {
      width: 24,
    },
    darkStyles: {
      width: 24,
    },
  },
  PostgreSQL: {
    src: 'postgresql.svg',
    lightStyles: {
      width: 24,
    },
    darkStyles: {
      width: 24,
      fill: '#f0f0f0',
    },
  },
  MySQL: {
    src: 'mysql.svg',
    lightStyles: {
      width: 24,
      fill: '#00546B',
    },
    darkStyles: {
      width: 24,
      fill: '#F0F0F0',
    },
  },
  SQLite: {
    src: 'sqlite.svg',
    lightStyles: {
      width: 24,
    },
    darkStyles: {
      width: 24,
    },
  },
  'Web SQLite': {
    src: 'database.svg',
    lightStyles: {
      width: 24,
    },
    darkStyles: {
      width: 24,
    },
  },
  LiteFS: {
    src: 'flyio.svg',
    lightStyles: {
      width: 28,
    },
    darkStyles: {
      width: 28,
    },
  },
};

export default Databases;
