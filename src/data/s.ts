import { type ISponsor, ImageType } from "@/types/Sponsors";

export const sponsorsData: ISponsor[] = [
  {
    tier: {
      name: "$100 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "val.town",
      name: "Val Town",
      avatarUrl:
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none"><rect width="400" height="400" fill="white"/><g clip-path="url(#clip0_1045_835)"><path d="M265.026 271.002C257.83 271.002 251.994 268.767 247.518 264.293C243.038 259.821 240.802 253.841 240.802 246.363V184.761H226.364V161.881H240.802V128H268.548V161.881H298.5V184.761H268.548V241.521C268.548 245.921 270.604 248.123 274.716 248.123H295.856V271.002H265.026Z" fill="black"/><path d="M204.362 174.325L158.23 250.768H154.266V178.601C154.266 169.37 146.776 161.887 137.536 161.887H126.518V253.01C126.518 262.95 134.586 271.01 144.536 271.01H163.396C173.396 271.01 182.638 265.682 187.64 257.03L242.664 161.887H226.404C217.384 161.887 209.02 166.606 204.362 174.325Z" fill="black"/><path d="M99.9939 161.887H127.8V184.769H99.9939V161.887Z" fill="black"/></g><defs><clipPath id="clip0_1045_835"><rect width="200" height="143.86" fill="white" transform="translate(100 128)"/></clipPath></defs></svg>',
    },
    createdAt: "2023-04-03T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    lightStyle: {
      filter: "invert(1)",
    },
  },
  {
    tier: {
      name: "$150 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "kinde.com",
      name: "Kinde",
      avatarUrl: "/images/kinde.jpeg",
    },
    createdAt: "2023-06-11T12:32:16Z",
    isActive: true,
    imageType: ImageType.IMAGE,
  },
  {
    tier: {
      name: "$100 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "zolplay.com",
      name: "Zolplay",
      avatarUrl: "/images/zolplay.jpeg",
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.IMAGE,
  },
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
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/turso-light.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      background: 'url("/svg/turso.svg") 0% 0% / cover no-repeat content-box',
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
        '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5293 4L26 10.901V23.9978L17.3608 29V15.9032L5.88452 9.00777L14.5293 4Z" fill="black"/><path d="M13.6559 28.2727V18.0518L5 23.0651L13.6559 28.2727Z" fill="black"/></svg>',
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "invert(1)",
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: true,
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
      background:
        'url("/svg/neon-dark.svg") 0% 0% / cover no-repeat content-box',
      padding: "10px",
    },
    lightStyle: {
      background:
        'url("/svg/neon-light.svg") 0% 0% / cover no-repeat content-box',
      padding: "10px",
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/snaplet",
      name: "Snaplet",
      avatarUrl: "/images/snaplet.png",
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.IMAGE,
    darkStyle: {
      padding: "6px",
    },
    lightStyle: {
      padding: "6px",
    },
  },
  {
    tier: {
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "unkey.dev",
      name: "Unkey",
      avatarUrl: "/images/unkey.jpeg",
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.IMAGE,
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/nuxt",
      name: "Nuxt",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2023-11-16T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/nuxt-green.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      background:
        'url("/svg/nuxt-green.svg") 0% 0% / cover no-repeat content-box',
    },
  },
];

export default sponsorsData;
