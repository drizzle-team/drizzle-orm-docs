import { SVGProps } from '../../../../../@types/SVGTypes';

const Runtimes: {
  [key: string]: {
    image: string,
    lightIcon?: SVGProps,
    darkIcon?: SVGProps,
    isImage?: boolean,
  },
} = {
  'Cloudflare Workers': {
    image: 'cloudflareworker',
    lightIcon: {
      width: 32,
    },
    darkIcon: {
      width: 32,
    },
  },
  'Supabase functions': {
    image: 'supabase',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
    },
  },
  Bun: {
    image: 'bun',
    lightIcon: {
      width: 32,
    },
    darkIcon: {
      width: 32,
    },
  },
  'Deno deploy': {
    image: 'deno',
    lightIcon: {
      width: 36,
    },
    darkIcon: {
      width: 36,
      fill: '#cccccc',
    },
  },
  Browser: {
    image: 'browser',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
      color: '#cccccc',
    },
  },
  ElectronJS: {
    image: 'electron',
    lightIcon: {
      width: 24,
    },
    darkIcon: {
      width: 24,
      filter: 'brightness(200%)',
    },
  },
  Lagon: {
    isImage: true,
    image: 'lagon',
    lightIcon: {
      filter: 'brightness(-100%)',
    },
    darkIcon: {
      filter: 'brightness(80%)',
    },
  },
  'Vercel functions': {
    image: 'vercel',
    lightIcon: {
      width: 32,
    },
    darkIcon: {
      fill: '#000000',
      width: 32,
    },
  },
};

export default Runtimes;
