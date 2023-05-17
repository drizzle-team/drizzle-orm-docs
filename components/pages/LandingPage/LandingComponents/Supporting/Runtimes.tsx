import { SVGProps } from '../../../../../@types/SVGTypes';

const Runtimes: {
  [key: string]: {
    src: string,
    srcDark?: string,
    lightStyles?: SVGProps,
    darkStyles?: SVGProps,
  },
} = {
  'Cloudflare Workers': {
    src: 'cloudflareworker.svg',
    lightStyles: {
      width: 32,
    },
    darkStyles: {
      width: 32,
    },
  },
  'Supabase functions': {
    src: 'supabase.svg',
    lightStyles: {
      width: 24,
    },
    darkStyles: {
      width: 24,
    },
  },
  Bun: {
    src: 'bun.svg',
    lightStyles: {
      width: 30,
    },
    darkStyles: {
      width: 30,
    },
  },
  'Deno deploy': {
    src: 'deno.svg',
    lightStyles: {
      width: 36,
    },
    darkStyles: {
      width: 36,
      fill: '#cccccc',
    },
  },
  Browser: {
    src: 'browser.svg',
    lightStyles: {
      width: 30,
    },
    darkStyles: {
      width: 30,
      color: '#cccccc',
    },
  },
  ElectronJS: {
    src: 'electron.svg',
    lightStyles: {
      width: 24,
    },
    darkStyles: {
      width: 24,
      filter: 'brightness(200%)',
    },
  },
  Lagon: {
    src: 'lagon.png',
    lightStyles: {
      filter: 'brightness(-100%)',
    },
    darkStyles: {
      filter: 'brightness(80%)',
    },
  },
  'Vercel functions': {
    src: 'vercel.svg',
    lightStyles: {
      width: 32,
    },
    darkStyles: {
      fill: '#000000',
      width: 32,
    },
  },
};

export default Runtimes;
