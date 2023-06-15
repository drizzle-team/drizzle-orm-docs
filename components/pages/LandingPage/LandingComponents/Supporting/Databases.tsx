import { SVGProps } from '../../../../../@types/SVGTypes';

const Databases: {
  [key: string]: {
    src: string,
    srcDark?: string,
    lightStyles?: SVGProps,
    darkStyles?: SVGProps,
    isImage?: boolean,
  },
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
  'Vercel storage': {
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
