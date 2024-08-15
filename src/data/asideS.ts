import { type ISponsor, ImageType } from "@/types/Sponsors";

export const sponsorsData: ISponsor[] = [
  {
    tier: {
      name: "$1,000 one time",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/turso",
      name: "Turso",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2023-12-21T15:51:27Z",
    isActive: false,
    imageType: ImageType.SVG,
    popover:
      "🚀 Drizzle is giving you 10% off Turso Scaler and Pro for 1 Year 🚀",
    lightStyle: {
      filter: "grayscale(1) invert(0.6)",
      background:
        'url("/svg/new-turso.svg") 0% 0% / cover no-repeat content-box',
    },
    darkStyle: {
      filter: "grayscale(1) brightness(0.35)",
      background:
        'url("/svg/new-turso-light.svg") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/payload",
      name: "Payload",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "brightness(0.3)",
      background:
        'url("/svg/payload-dark.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      filter: "invert(0.6)",
      background: 'url("/svg/payload.svg") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/xataio",
      name: "Xata",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1054.35 379.14C1054.24 469.137 1018.35 555.408 954.56 618.971V618.964L728.273 844.45C720.432 852.27 707.693 852.29 700.346 844.01C645.331 782.018 614.758 701.838 614.856 618.535C614.961 528.538 650.856 442.268 714.643 378.705L714.65 378.711L921.39 172.697C940.02 154.128 970.51 153.996 986.31 175.022C1030.3 233.547 1054.44 305.11 1054.35 379.14Z" fill="url(#paint0_linear_202_71)"/><path d="M244.786 620.345C180.999 556.782 145.105 470.512 145 380.515C144.913 306.485 169.048 234.921 213.035 176.396C228.838 155.37 259.328 155.503 277.963 174.072L484.703 380.088L484.71 380.081C548.497 443.645 584.391 529.914 584.497 619.912C584.594 703.214 554.022 783.395 499.007 845.38C491.659 853.66 478.92 853.64 471.08 845.83L244.793 620.339L244.786 620.345Z" fill="url(#paint1_linear_202_71)"/><path d="M946.05 1023.83C929.42 1044.22 899.02 1044.04 880.42 1025.42L752.727 897.58C744.891 889.73 744.906 877.02 752.76 869.19L964.85 657.848C972.69 650.035 985.48 649.989 992.39 658.632C1029.2 704.628 1043.68 768.198 1032.74 838.18C1022.72 902.24 992.08 967.37 946.05 1023.83Z" fill="url(#paint2_linear_202_71)"/><path d="M318.931 1026.8C300.337 1045.41 269.929 1045.59 253.305 1025.2C207.269 968.74 176.633 903.62 166.617 839.56C155.675 769.571 170.149 706.001 206.959 660.005C213.876 651.363 226.663 651.408 234.504 659.221L446.595 870.57C454.449 878.39 454.464 891.11 446.629 898.95L318.931 1026.8Z" fill="url(#paint3_linear_202_71)"/><defs><linearGradient id="paint0_linear_202_71" x1="599.676" y1="158.999" x2="599.676" y2="859.4" gradientUnits="userSpaceOnUse"><stop stop-color="#9F87FF"/><stop offset="1" stop-color="#8566FF"/></linearGradient><linearGradient id="paint1_linear_202_71" x1="599.676" y1="159" x2="599.676" y2="859.4" gradientUnits="userSpaceOnUse"><stop stop-color="#9F87FF"/><stop offset="1" stop-color="#8566FF"/></linearGradient><linearGradient id="paint2_linear_202_71" x1="599.676" y1="643.766" x2="599.676" y2="1039.93" gradientUnits="userSpaceOnUse"><stop stop-color="#DE99F6"/><stop offset="1" stop-color="#D669FC"/></linearGradient><linearGradient id="paint3_linear_202_71" x1="599.676" y1="643.766" x2="599.676" y2="1039.93" gradientUnits="userSpaceOnUse"><stop stop-color="#DE99F6"/><stop offset="1" stop-color="#D669FC"/></linearGradient></defs></svg>',
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "brightness(0.5) grayscale(1)",
    },
    lightStyle: {
      filter: "grayscale(1) brightness(1.2)",
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/neon",
      name: "Neon",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2023-11-16T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "brightness(0.3) grayscale(1)",
      background:
        'url("/svg/neon-dark.svg") 0% 0% / cover no-repeat content-box',
      padding: "6px",
    },
    lightStyle: {
      filter: "brightness(0.8) grayscale(1)",
      background:
        'url("/svg/neon-light.svg") 0% 0% / cover no-repeat content-box',
      padding: "6px",
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "https://hub.nuxt.com/?utm_source=drizzle-docs",
      name: "Nuxt",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    followLink: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "brightness(0.4) grayscale(1)",
      background:
        'url("/svg/nuxt-green.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      filter: "brightness(0.9) grayscale(1)",
      background:
        'url("/svg/nuxt-green.svg") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/hydraso",
      name: "Hydra",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "brightness(0.5) grayscale(1)",
      background:
        'url("/images/hydra-orange.png") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      filter: "invert(0.6)",
      background:
        'url("/images/hydra-black.png") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/zerocopylabs",
      name: "Zero Copy",
      avatarUrl:
        '<svg baseProfile="full" height="738" version="1.1" width="738" xmlns="http://www.w3.org/2000/svg" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xlink="http://www.w3.org/1999/xlink"><defs /><image xlink:href="data:image/png;base64,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" /></svg>',
    },
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    lightStyle: {
      filter: "grayscale(1) invert(0.6) brightness(1.5)",
    },
    darkStyle: {
      filter: "grayscale(1) invert(0.3) brightness(0.4)",
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/gold",
      name: "Become a Gold Sponsor",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2023-11-16T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
  },
];

export default sponsorsData;
