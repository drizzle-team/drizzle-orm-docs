import { type ISupportingElement } from "@/types/Supporting";

const Runtimes: {
  [key: string]: ISupportingElement;
} = {
  "Cloudflare Workers": {
    imageSrc: "/public/svg/cloudflareworker.svg",
    lightStyle: {
      width: 32,
    },
    darkStyle: {
      width: 32,
    },
  },
  "Supabase functions": {
    imageSrc: "/public/svg/supabase.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
  },
  Bun: {
    imageSrc: "/public/svg/bun.svg",
    lightStyle: {
      width: 30,
    },
    darkStyle: {
      width: 30,
    },
  },
  "Deno deploy": {
    imageSrc: "/public/svg/deno.svg",
    lightStyle: {
      width: 36,
    },
    darkStyle: {
      width: 36,
      fill: "#cccccc",
    },
  },
  Browser: {
    imageSrc: "/public/svg/browser.svg",
    lightStyle: {
      width: 30,
    },
    darkStyle: {
      width: 30,
      color: "#cccccc",
    },
  },
  ElectronJS: {
    imageSrc: "/public/svg/electron.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
      filter: "brightness(200%)",
    },
  },
  Lagon: {
    imageSrc: "/public/svg/lagon.webp",
    lightStyle: {
      filter: "brightness(15%)",
      width: 24,
    },
    darkStyle: {
      filter: "brightness(80%)",
      width: 24,
    },
  },
  "Vercel functions": {
    imageSrc: "/public/svg/vercel.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      fill: "#000000",
      width: 24,
    },
  },
  "Fly.io": {
    imageSrc: "/public/svg/flyio.svg",
    lightStyle: {
      width: 28,
    },
    darkStyle: {
      width: 28,
    },
  },
};

export default Runtimes;
