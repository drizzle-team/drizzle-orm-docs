import { SVGProps } from '../../../../../@types/SVGTypes';

const Databases: {
  [key: string]: {
    image: string,
    lightIcon?: SVGProps,
    darkIcon?: SVGProps,
    isImage?: boolean,
  },
} = {
  Neon: {
    image: 'neon-serverless',
    lightIcon: {
      width: 24,
      src: '/svg/neon-light.svg',
    },
    darkIcon: {
      width: 24,
      src: '/svg/neon-dark.svg',
    },
  },
  PlanetScale: {
    image: 'planetscale',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
      fill: '#f0f0f0',
    },
  },
  Turso: {
    image: 'turso',
    lightIcon: {
      width: 28,
      src: '/svg/turso-light.svg',
    },
    darkIcon: {
      width: 28,
    },
  },
  Supabase: {
    image: 'supabase',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
  },
  PostgreSQL: {
    image: 'postgres-js',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
      fill: '#f0f0f0',
    },
  },
  MySQL: {
    image: 'server',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
  },
  SQLite: {
    image: 'server',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
  },
  'Web SQLite': {
    image: 'server',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
  },
};

export default Databases;
