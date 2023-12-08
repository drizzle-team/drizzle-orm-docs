import { type ISponsor, ImageType } from "@/types/Sponsors";

export const sponsorsData: ISponsor[] = [
  {
    tier: {
      name: "$1,000 one time",
      isOneTime: true,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/turso",
      name: "Turso",
      avatarUrl:
        '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.2734 6.00408L33.5708 5.4785L32.1823 6.96493L31.0691 5.35689L30.4286 5.65094L31.3098 7.89882L30.9018 8.33563L27.7391 5L27.0222 5.35519L29.8348 11.4003L27.1994 12.3268H27.1366L25.7079 10.6278L24.2781 12.3282H15.9952L14.5653 10.6278L13.1326 12.3317H13.0883L10.4384 11.4001L13.2512 5.35519L12.5343 5L9.37147 8.33554L8.96345 7.89874L9.84473 5.65086L9.20435 5.35681L8.09111 6.96484L6.70257 5.4785L6 6.00408L8.16164 9.6115L7.04918 10.7847L7.43812 13.754L10.0146 14.738L10.0095 16.0219H7.56972V16.576L8.51412 17.9232L10.0095 18.4645V27.179L13.8316 32.8674L14.7075 35L16.0841 32.9925L17.5108 35L18.76 32.9925L20.1366 35L21.5132 32.9925L22.7624 35L24.1891 32.9925L25.5656 35L26.4416 32.8674L30.2637 27.179V18.4645L31.759 17.9232L32.7034 16.576V16.0219H30.2637L30.2674 14.7347L32.8351 13.754L33.224 10.7848L32.1115 9.61158L34.2734 6.00408ZM23.1118 29.401H15.1782L16.1699 27.3822L17.1616 29.401L18.1532 28.048L19.1449 29.401L20.1366 28.0479L21.1283 29.401L22.12 28.048L23.1118 29.401L24.1034 27.3822L25.0951 29.401H23.1118ZM27.9686 20.1632L23.8433 21.5192L23.6656 25.3456L20.1322 26.1286L16.5989 25.3456L16.4212 21.5192L12.2958 20.1632V18.1206L17.6289 19.6318L17.5639 24.7906H22.7005L22.6355 19.6318L27.9686 18.1206V20.1632Z" fill="#88FFE4"/></svg>',
    },
    createdAt: "2023-12-21T15:51:27Z",
    isActive: false,
    imageType: ImageType.SVG,
    lightStyle: {
      filter: "brightness(0.3)",
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: true,
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
      isOneTime: true,
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
      padding: "5px",
    },
    lightStyle: {
      background:
        'url("/svg/neon-light.svg") 0% 0% / cover no-repeat content-box',
      padding: "5px",
    },
  },
];

export default sponsorsData;
