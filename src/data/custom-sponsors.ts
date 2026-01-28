import { ImageType, type ISponsor } from "@/types";

export const customSponsors: ISponsor[] = [
  {
    tier: {
      name: "$2500 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/railway",
      name: "Railway",
      avatarUrl:
        '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none"><path d="M4.756 438.175A520.713 520.713 0 0 0 0 489.735h777.799c-2.716-5.306-6.365-10.09-10.045-14.772-132.97-171.791-204.498-156.896-306.819-161.26-34.114-1.403-57.249-1.967-193.037-1.967-72.677 0-151.688.185-228.628.39-9.96 26.884-19.566 52.942-24.243 74.14h398.571v51.909H4.756ZM783.93 541.696H.399c.82 13.851 2.112 27.517 3.978 40.999h723.39c32.248 0 50.299-18.297 56.162-40.999ZM45.017 724.306S164.941 1018.77 511.46 1024c207.112 0 385.071-123.006 465.907-299.694H45.017Z" fill="#fff"/><path d="M511.454 0C319.953 0 153.311 105.16 65.31 260.612c68.771-.144 202.704-.226 202.704-.226h.031v-.051c158.309 0 164.193.707 195.118 1.998l19.149.706c66.7 2.224 148.683 9.384 213.19 58.19 35.015 26.471 85.571 84.896 115.708 126.52 27.861 38.499 35.876 82.756 16.933 125.158-17.436 38.97-54.952 62.215-100.383 62.215H16.69s4.233 17.944 10.58 37.751h970.632A510.385 510.385 0 0 0 1024 512.218C1024.01 229.355 794.532 0 511.454 0Z" fill="#fff"/></svg>',
    },
    createdAt: "2025-01-28T00:00:00Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "brightness(1)",
      background:
        'url("/svg/railway.svg") center / contain no-repeat content-box',
      padding: "8px",
    },
    lightStyle: {
      filter: "invert(1)",
      background:
        'url("/svg/railway.svg") center / contain no-repeat content-box',
      padding: "8px",
    },
  },
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
    popover:
      "🚀 Drizzle is giving you 10% off Turso Scaler and Pro for 1 Year 🚀",
    darkStyle: {
      background:
        'url("/svg/new-turso-light.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      background:
        'url("/svg/new-turso.svg") 0% 0% / cover no-repeat content-box',
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
        '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00425 9.14649C7.09439 9.09438 7.20349 9.09432 7.29123 9.14649L17.1724 14.8535C17.2768 14.9152 17.343 15.0268 17.343 15.1501V18.2253C17.343 18.3582 17.1981 18.4416 17.0842 18.3751L8.87371 13.6336C8.77884 13.5794 8.66014 13.6484 8.66014 13.7575V20.0599C8.66018 20.1619 8.7148 20.2547 8.80252 20.3069L15.874 24.3884L15.8718 24.3832C15.9619 24.4354 16.071 24.4353 16.1587 24.3832L21.6596 21.2086C21.7664 21.1469 21.8969 21.1469 22.0037 21.2086L24.6614 22.7436C24.7753 22.8101 24.7753 22.9738 24.6614 23.0403L16.1424 27.9597C16.0524 28.0118 15.9432 28.0118 15.8554 27.9597L5.71098 22.1029C5.62318 22.0531 5.5686 21.958 5.5686 21.856V10.1409C5.5686 10.0389 5.62318 9.94618 5.71098 9.89398L7.00425 9.14649Z" fill="black"/><path d="M15.8554 4.03793C15.9456 3.98574 16.0546 3.98573 16.1424 4.03793L26.2891 9.89398V9.8962C26.3769 9.94602 26.4314 10.0411 26.4315 10.1431V19.8961C26.4315 20.0289 26.2866 20.1123 26.1727 20.0459L23.5439 18.5272C23.4395 18.4655 23.3726 18.3539 23.3726 18.2305V11.8947C23.3726 11.7927 23.318 11.7 23.2302 11.6478L16.1587 7.56624C16.0686 7.51412 15.9595 7.51407 15.8718 7.56624L13.4706 8.95221C13.3639 9.01386 13.2333 9.01376 13.1265 8.95221L10.4925 7.43128C10.3786 7.36483 10.3786 7.2011 10.4925 7.13466L15.8554 4.03793Z" fill="black"/></svg>',
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
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/silver-sponsor-unkey",
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
      login: "hub.nuxt.com/?utm_source=drizzle-docs",
      name: "Nuxt",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    followLink: true,
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
  {
    tier: {
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/silver-sponsor-tidb",
      name: "TiDB",
      avatarUrl:
        '<svg xmlns="http://www.w3.org/2000/svg" width="57" height="65" viewBox="0 0 57 65" fill="none"><path d="M0.849609 16.3821V48.3821L28.5617 64.3838L56.2739 48.3821V16.3821L28.5617 0.383789L0.849609 16.3821Z" fill="#E60C0C"/><path d="M28.5457 11.0675L10.1416 21.6944V32.318L19.3469 27.0029V48.3959L28.5457 53.701V21.6911L37.7477 16.3793L28.5457 11.0675Z" fill="white"/><path d="M37.7998 27.0562V48.3829L47.0383 43.0512V21.7179L37.7998 27.0562Z" fill="white"/></svg>',
    },
    createdAt: "2023-11-16T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
  },
  {
    tier: {
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/silver-sponsor-logto",
      name: "Logto",
      avatarUrl:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="#141420"/><mask id="mask0_152_11" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="5" y="4" width="14" height="16"><path d="M18.3333 4H5V20H18.3333V4Z" fill="white"/></mask><g mask="url(#mask0_152_11)"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 6.49834C5 6.03863 5 5.80878 5.08914 5.62377C5.1677 5.46073 5.29403 5.32254 5.4531 5.22567C5.63361 5.11575 5.87359 5.08312 6.35354 5.01787L13.1986 4.0872C13.8199 4.00272 14.1306 3.96048 14.372 4.04967C14.5839 4.12796 14.7608 4.27331 14.8726 4.46109C15 4.675 15 4.97256 15 5.56767V18.4323C15 19.0274 15 19.325 14.8726 19.5389C14.7608 19.7267 14.5839 19.872 14.372 19.9503C14.1306 20.0395 13.8199 19.9973 13.1986 19.9128L6.35354 18.9821C5.8736 18.9169 5.6336 18.8842 5.4531 18.7743C5.29403 18.6775 5.1677 18.5393 5.08914 18.3762C5 18.1912 5 17.9614 5 17.5017V6.49834ZM12.3333 10.8359C12.3333 10.696 12.3333 10.626 12.3568 10.5706C12.3775 10.5219 12.4108 10.4812 12.4522 10.4537C12.4993 10.4225 12.5616 10.4161 12.6861 10.4035L13.2437 10.3467C13.3904 10.3318 13.4637 10.3243 13.5204 10.3517C13.5701 10.3758 13.6113 10.4178 13.6372 10.4711C13.6667 10.5318 13.6667 10.6143 13.6667 10.7792V13.2208C13.6667 13.3857 13.6667 13.4682 13.6372 13.5289C13.6113 13.5822 13.5701 13.6242 13.5204 13.6483C13.4637 13.6757 13.3904 13.6682 13.2437 13.6533L12.6861 13.5965C12.5616 13.5839 12.4993 13.5775 12.4522 13.5463C12.4108 13.5188 12.3775 13.4781 12.3568 13.4294C12.3333 13.374 12.3333 13.304 12.3333 13.1641V10.8359ZM16.8815 5.66667H16V18.6667H16.8815C17.3897 18.6667 17.6438 18.6667 17.8379 18.5675C18.0086 18.4802 18.1474 18.341 18.2344 18.1698C18.3333 17.9751 18.3333 17.7203 18.3333 17.2107V7.12267C18.3333 6.61302 18.3333 6.35819 18.2344 6.16354C18.1474 5.99231 18.0086 5.8531 17.8379 5.76585C17.6438 5.66667 17.3897 5.66667 16.8815 5.66667Z" fill="url(#paint0_linear_152_11)"/></g><defs><linearGradient id="paint0_linear_152_11" x1="0.873017" y1="15.0651" x2="17.2965" y2="8.35123" gradientUnits="userSpaceOnUse"><stop stop-color="#4B2EFB"/><stop offset="1" stop-color="#E65FFC"/></linearGradient></defs></svg>',
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
  },
  // {
  //   tier: {
  //     name: "$1000 a month",
  //     isOneTime: false,
  //   },
  //   sponsorEntity: {
  //     __typename: "Organization",
  //     login: "driz.link/hydraso",
  //     name: "Hydra",
  //     avatarUrl:
  //       '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
  //   },
  //   createdAt: "2024-06-07T13:32:16Z",
  //   isActive: true,
  //   imageType: ImageType.SVG,
  //   darkStyle: {
  //     background:
  //       'url("/images/hydra-orange.png") 0% 0% / cover no-repeat content-box',
  //   },
  //   lightStyle: {
  //     background:
  //       'url("/images/hydra-black.png") 0% 0% / cover no-repeat content-box',
  //   },
  // },
  // {
  //   tier: {
  //     name: "$1000 a month",
  //     isOneTime: false,
  //   },
  //   sponsorEntity: {
  //     __typename: "Organization",
  //     login: "driz.link/decocx",
  //     name: "Deco",
  //     avatarUrl: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  //       <path d="M6.77828 19.8642C4.2582 19.8642 2.25696 18.9006 1.07104 17.1959C-0.189006 15.417 -0.337247 12.8969 0.626315 10.2286C1.96048 6.74493 5.14764 4.59545 9.00189 4.59545H9.07601C9.07601 4.52133 9.07601 4.44721 9.07601 4.29897C9.00189 3.03893 9.81721 1.92712 11.0031 1.55652L14.4868 0.22236C14.8574 0.0741201 15.228 0 15.5986 0C16.7104 0 17.7481 0.592961 18.2669 1.63064L19.6752 4.59545C20.1199 5.48489 20.1199 6.59669 19.6011 7.41201C19.0822 8.22733 18.2669 8.67205 17.3775 8.74618C17.1551 9.1909 17.0069 9.63562 16.7845 10.0062C16.3398 11.0439 15.8951 12.0816 15.3762 13.1934C13.4491 17.1959 11.2996 19.8642 6.77828 19.8642Z" fill="#113032"/>
  //       <path d="M6.77828 17.27C9.59484 17.27 11.1514 16.0099 13.0044 12.0816C14.0421 9.9321 14.8574 7.78261 15.8209 5.70725L17.0069 6.07785C17.3033 6.15197 17.5257 6.00373 17.3775 5.70725L15.8951 2.81656C15.8209 2.5942 15.5245 2.5942 15.3762 2.66832L11.8184 4.00248C11.522 4.0766 11.522 4.37309 11.8184 4.44721L12.8561 4.81781C11.9667 6.74493 10.929 9.70974 10.0396 11.5627C9.076 13.6381 8.63128 15.0464 6.92652 15.0464C5.22176 15.0464 4.9994 13.7863 5.7406 11.9333C6.55592 9.78385 7.89008 9.19089 9.37248 9.63561C9.8172 9.04265 10.1137 8.15321 10.2619 7.33789C9.8172 7.18965 9.29836 7.18965 8.85364 7.18965C6.40768 7.18965 3.96171 8.44969 2.92403 11.118C1.81223 14.6017 2.99815 17.27 6.77828 17.27Z" fill="#02F67C"/>
  //       </svg>`,
  //   },
  //   createdAt: "2024-06-07T13:32:16Z",
  //   isActive: true,
  //   imageType: ImageType.SVG,
  //   darkStyle: {
  //     padding: "10px",
  //   },
  //   lightStyle: {
  //     padding: "10px",
  //   },
  // },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/sqlitecloud",
      name: "SQLite Cloud",
      avatarUrl: `<svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48.4608 27C48.4608 38.8779 38.84 48.5 26.9804 48.5C15.1209 48.5 5.5 38.8779 5.5 27C5.5 15.1221 15.1209 5.5 26.9804 5.5C38.84 5.5 48.4608 15.1221 48.4608 27Z" fill="#CFE2F8" stroke="#CFE2F8" stroke-width="11"></path>
<path d="M24.6796 12.4775C27.1916 8.34049 32.5791 7.02455 36.7128 9.53821C40.8466 12.0519 42.1612 17.4433 39.6492 21.5803L31.6724 34.7169C29.1603 38.8538 23.7728 40.1698 19.6391 37.6561C15.5053 35.1425 14.1907 29.751 16.7027 25.6141L24.6796 12.4775Z" fill="white"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.2892 33.8758L38.266 20.7392C40.3138 17.3667 39.2421 12.9716 35.8723 10.9225C32.5025 8.87335 28.1106 9.94611 26.0627 13.3186L18.0859 26.4552C16.0381 29.8276 17.1098 34.2227 20.4796 36.2718C23.8495 38.321 28.2414 37.2482 30.2892 33.8758ZM36.7128 9.53821C32.5791 7.02455 27.1916 8.34049 24.6796 12.4775L16.7027 25.6141C14.1907 29.751 15.5053 35.1425 19.6391 37.6561C23.7728 40.1698 29.1603 38.8538 31.6724 34.7169L39.6492 21.5803C42.1612 17.4433 40.8466 12.0519 36.7128 9.53821Z" fill="black"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.4389 19.6737C31.817 19.9122 31.9304 20.4122 31.6921 20.7907L16.1192 45.5232C15.881 45.9017 15.3813 46.0151 15.0031 45.7767C14.625 45.5383 14.5116 45.0382 14.7499 44.6598L30.3228 19.9272C30.561 19.5488 31.0607 19.4353 31.4389 19.6737Z" fill="black"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M33.1051 30.9949C33.1775 31.3606 32.94 31.7158 32.5746 31.7882C27.7347 32.7478 25.313 32.1394 24.2687 31.4044C23.9641 31.19 23.8908 30.7689 24.105 30.464C24.3193 30.159 24.74 30.0857 25.0447 30.3001C25.6271 30.71 27.5811 31.4021 32.3126 30.464C32.6779 30.3915 33.0328 30.6292 33.1051 30.9949Z" fill="black"></path>
</svg>`,
    },
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      padding: "9px",
    },
    lightStyle: {
      padding: "9px",
    },
  },
  // {
  //   tier: {
  //     name: "$2500 a month",
  //     isOneTime: false,
  //   },
  //   sponsorEntity: {
  //     __typename: "Organization",
  //     login: "driz.link/edgedb",
  //     name: "Gel",
  //     avatarUrl: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="154" viewBox="0 0 200 154" fill="none">
  //         <path d="M0 68.6C0 90.4 17.8499 108 39.9594 108C61.8661 108 79.9189 90.4 79.9189 68.6C79.9189 47 61.8661 29.2 39.9594 29.2C17.8499 29.2 0 47 0 68.6ZM171.197 14C171.197 6.6 177.485 0 185.396 0C193.306 0 200 6.6 200 14V94C200 101.4 193.306 108 185.396 108C177.485 108 171.197 101.4 171.197 94V14ZM10.5477 127.6C12.1704 141.4 23.7323 154 39.9594 154C55.9838 154 67.9513 141.4 69.574 127.6C71.8053 107.6 53.3469 114.2 39.9594 114.2C26.572 114.2 8.31643 107.6 10.5477 127.6ZM139.351 74.2C140.771 71 144.422 69 151.521 69C162.677 68.8 167.14 61.6 161.258 50.2C157.201 42.4 150.913 36.4 142.394 32.6C122.312 23.8 98.5801 32.8 89.6552 52.6C80.7302 72.2 89.6552 95.6 109.939 104.6C118.458 108.2 126.978 108.8 135.7 106.6C148.276 103.2 150.913 95 143.408 86.8C138.742 81.4 137.728 77.6 139.351 74.2Z" fill="url(#paint0_linear_59_46)"/>
  //         <defs>
  //         <linearGradient id="paint0_linear_59_46" x1="250.254" y1="0" x2="250.254" y2="154" gradientUnits="userSpaceOnUse">
  //         <stop stop-color="#FFC800"/>
  //         <stop offset="1" stop-color="#FF4800"/>
  //         </linearGradient>
  //         </defs>
  //       </svg>`,
  //   },
  //   createdAt: "2024-06-07T13:32:16Z",
  //   isActive: true,
  //   imageType: ImageType.SVG,
  //   darkStyle: {
  //     padding: "12px",
  //   },
  //   lightStyle: {
  //     padding: "12px",
  //   },
  // },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/upstash",
      name: "Upstash",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2024-12-22T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/upstash-icon-dark-bg.svg") 0% 0% / cover no-repeat content-box',
      padding: "12px",
    },
    lightStyle: {
      background:
        'url("/svg/upstash-icon-white-bg.svg") 0% 0% / cover no-repeat content-box',
      padding: "12px",
    },
  },

  {
    tier: {
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/dbos",
      name: "DBOS",
      avatarUrl: "/images/dbos.png",
    },
    createdAt: "2024-08-13T16:35:56Z",
    isActive: true,
    imageType: ImageType.IMAGE,
  },
  {
    tier: {
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/praha",
      name: "PrAha",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2024-08-13T16:35:56Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/praha-dark.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      background:
        'url("/svg/praha-light.svg") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/lokalise",
      name: "Lokalise",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2025-01-23T16:35:56Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/lokalise-dark.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      background:
        'url("/svg/lokalise-light.svg") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/replit",
      name: "Replit",
      avatarUrl: `<svg version="1.1" id="Artwork" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 793.8 871.5" style="enable-background:new 0 0 793.8 871.5;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F5640C;}
</style>
<g>
	<path class="st0" d="M396.9,356.1H227.2c-16.6,0-30-13.4-30-30v-99.8c0-16.6,13.4-30,30-30h139.7c16.6,0,30,13.4,30,30V356.1z"/>
	<path class="st0" d="M566.6,515.8H396.9V356.1h169.7c16.5,0,29.9,13.4,29.9,29.9v99.8C596.5,502.4,583.1,515.8,566.6,515.8z"/>
	<path class="st0" d="M366.9,675.6H227.2c-16.5,0-29.9-13.4-29.9-29.9v-99.8c0-16.5,13.4-29.9,29.9-29.9h169.7v129.8
		C396.9,662.1,383.5,675.6,366.9,675.6z"/>
</g>
</svg>
`,
    },
    createdAt: "2024-08-13T16:35:56Z",
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
      login: "driz.link/sentry",
      name: "Sentry",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2025-01-23T16:35:56Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/sentry-dark.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      background:
        'url("/svg/sentry-light.svg") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/sevalla",
      name: "Sevalla",
      avatarUrl:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.54035 3C4.58508 3 3 4.58508 3 6.54035V17.4596C3 19.4149 4.58508 21 6.54035 21H17.4596C19.4149 21 21 19.4149 21 17.4596V6.54035C21 4.58508 19.4149 3 17.4596 3H6.54035ZM9.97653 6.76172V8.88275H8.06248V10.7451C8.06248 11.1365 8.2078 11.2601 8.30213 11.3403C8.32714 11.3615 8.34854 11.3798 8.36274 11.3991L9.95776 13.036H8.06248V15.1349H9.95776V17.2559H14.0297V15.1349H9.95776V13.036H13.5262C14.0204 13.036 14.0204 13.6346 14.0204 13.9081V15.1349H15.9344V13.2725C15.9344 12.8811 15.7891 12.7575 15.6947 12.6773C15.6697 12.6561 15.6483 12.6378 15.6341 12.6185L14.0204 10.9816H15.9375L15.9344 8.88275H14.0297L14.0204 10.9816H10.4707C9.97653 10.9816 9.97653 10.383 9.97653 10.1095V8.88275H14.0297V6.76172H9.97653Z" fill="#F97316"/></svg>',
    },
    createdAt: "2025-01-23T16:35:56Z",
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
      login: "driz.link/gibsonai",
      name: "GibsonAI",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2024-08-13T16:35:56Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/gibsonai-dark.svg") 0% 0% / contain no-repeat content-box',
    },
    lightStyle: {
      background:
        'url("/svg/gibsonai-light.svg") 0% 0% / contain no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$100 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/solidhour",
      name: "Solid Hour",
      avatarUrl: "/images/solidhour.png",
    },
    createdAt: "2023-06-11T12:32:16Z",
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
      login: "driz.link/warp",
      name: "Warp",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2025-11-07T00:00:00Z",
    isActive: true,
    imageType: ImageType.SVG,
    lightStyle: {
      background:
      'url("/svg/warp-light.svg") center / contain no-repeat content-box',
    },
    darkStyle: {
      background:
        'url("/svg/warp-dark.svg") center / contain no-repeat content-box',
    },
  },
];
