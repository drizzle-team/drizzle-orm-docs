import { ImageType, type ISponsor } from "@/types";

export const customSponsors: ISponsor[] = [
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
      background:
        'url("/images/hydra-orange.png") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
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
      login: "driz.link/decocx",
      name: "Deco",
      avatarUrl: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6.77828 19.8642C4.2582 19.8642 2.25696 18.9006 1.07104 17.1959C-0.189006 15.417 -0.337247 12.8969 0.626315 10.2286C1.96048 6.74493 5.14764 4.59545 9.00189 4.59545H9.07601C9.07601 4.52133 9.07601 4.44721 9.07601 4.29897C9.00189 3.03893 9.81721 1.92712 11.0031 1.55652L14.4868 0.22236C14.8574 0.0741201 15.228 0 15.5986 0C16.7104 0 17.7481 0.592961 18.2669 1.63064L19.6752 4.59545C20.1199 5.48489 20.1199 6.59669 19.6011 7.41201C19.0822 8.22733 18.2669 8.67205 17.3775 8.74618C17.1551 9.1909 17.0069 9.63562 16.7845 10.0062C16.3398 11.0439 15.8951 12.0816 15.3762 13.1934C13.4491 17.1959 11.2996 19.8642 6.77828 19.8642Z" fill="#113032"/>
        <path d="M6.77828 17.27C9.59484 17.27 11.1514 16.0099 13.0044 12.0816C14.0421 9.9321 14.8574 7.78261 15.8209 5.70725L17.0069 6.07785C17.3033 6.15197 17.5257 6.00373 17.3775 5.70725L15.8951 2.81656C15.8209 2.5942 15.5245 2.5942 15.3762 2.66832L11.8184 4.00248C11.522 4.0766 11.522 4.37309 11.8184 4.44721L12.8561 4.81781C11.9667 6.74493 10.929 9.70974 10.0396 11.5627C9.076 13.6381 8.63128 15.0464 6.92652 15.0464C5.22176 15.0464 4.9994 13.7863 5.7406 11.9333C6.55592 9.78385 7.89008 9.19089 9.37248 9.63561C9.8172 9.04265 10.1137 8.15321 10.2619 7.33789C9.8172 7.18965 9.29836 7.18965 8.85364 7.18965C6.40768 7.18965 3.96171 8.44969 2.92403 11.118C1.81223 14.6017 2.99815 17.27 6.77828 17.27Z" fill="#02F67C"/>
        </svg>`,
    },
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      padding: "10px",
    },
    lightStyle: {
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
      login: "driz.link/tembo",
      name: "Tembo",
      avatarUrl: "/images/tembo.png",
    },
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.IMAGE,
    darkStyle: {
      padding: "11px",
    },
    lightStyle: {
      padding: "11px",
    },
  },
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
  {
    tier: {
      name: "$2500 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/edgedb",
      name: "Gel",
      avatarUrl:
        `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="154" viewBox="0 0 200 154" fill="none">
          <path d="M0 68.6C0 90.4 17.8499 108 39.9594 108C61.8661 108 79.9189 90.4 79.9189 68.6C79.9189 47 61.8661 29.2 39.9594 29.2C17.8499 29.2 0 47 0 68.6ZM171.197 14C171.197 6.6 177.485 0 185.396 0C193.306 0 200 6.6 200 14V94C200 101.4 193.306 108 185.396 108C177.485 108 171.197 101.4 171.197 94V14ZM10.5477 127.6C12.1704 141.4 23.7323 154 39.9594 154C55.9838 154 67.9513 141.4 69.574 127.6C71.8053 107.6 53.3469 114.2 39.9594 114.2C26.572 114.2 8.31643 107.6 10.5477 127.6ZM139.351 74.2C140.771 71 144.422 69 151.521 69C162.677 68.8 167.14 61.6 161.258 50.2C157.201 42.4 150.913 36.4 142.394 32.6C122.312 23.8 98.5801 32.8 89.6552 52.6C80.7302 72.2 89.6552 95.6 109.939 104.6C118.458 108.2 126.978 108.8 135.7 106.6C148.276 103.2 150.913 95 143.408 86.8C138.742 81.4 137.728 77.6 139.351 74.2Z" fill="url(#paint0_linear_59_46)"/>
          <defs>
          <linearGradient id="paint0_linear_59_46" x1="250.254" y1="0" x2="250.254" y2="154" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFC800"/>
          <stop offset="1" stop-color="#FF4800"/>
          </linearGradient>
          </defs>
        </svg>`,
    },
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      padding: "12px",
    },
    lightStyle: {
      padding: "12px",
    }
  },
  {
    tier: {
      name: "$2500 a month",
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
      login: "driz.link/usemotion",
      name: "Motion",
      avatarUrl: "/images/motion.png",
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
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/singlestore",
      name: "SingleStore",
      avatarUrl: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.4079 11.2985C17.375 11.4131 17.3384 11.5267 17.2986 11.6382C17.2566 11.7555 17.2115 11.8706 17.1621 11.9842L15.511 11.9497C15.511 11.9832 15.511 12.0161 15.5099 12.0495L19.998 12.1435C20.0038 11.8786 19.9969 11.6143 19.9762 11.3521L17.4074 11.2985H17.4079Z" fill="black"/>
      <path d="M13.9431 4.20169L13.898 4.31368C14.1469 4.40709 14.3879 4.51802 14.6198 4.64381L13.0228 8.60274C13.1199 8.63247 13.217 8.66697 13.3131 8.70571C13.3179 8.70783 13.3226 8.70942 13.3269 8.71156L15.0057 4.54934C15.0009 4.54722 14.9961 4.54562 14.9919 4.5435C14.6458 4.40391 14.2955 4.29033 13.9431 4.20169Z" fill="black"/>
      <path d="M15.5487 5.27329C15.7488 5.43942 15.9377 5.61881 16.1139 5.81043L13.8354 8.96844C13.915 9.01728 13.9925 9.06876 14.0668 9.12289L16.6935 5.48294C16.4117 5.27913 16.1139 5.09177 15.8013 4.92352L15.5487 5.27382V5.27329Z" fill="black"/>
      <path d="M16.7545 6.65008C16.8904 6.86663 17.012 7.09274 17.1186 7.32734L14.5296 9.52628C14.5837 9.58254 14.6358 9.64038 14.6862 9.70037L18.1075 6.79446C17.8957 6.54394 17.668 6.30563 17.4249 6.08112L16.7551 6.65008H16.7545Z" fill="black"/>
      <path d="M18.7089 7.60544L17.4419 8.23705C17.5056 8.4796 17.5539 8.72852 17.5858 8.98276L15.0604 10.2417C15.0912 10.2969 15.1209 10.3526 15.1485 10.4089L19.1648 8.40688C19.0284 8.13142 18.8761 7.86391 18.7083 7.60544H18.7089Z" fill="black"/>
      <path d="M17.6297 9.83623C17.6244 10.0878 17.6027 10.3362 17.5655 10.5793L15.3947 11.0665C15.4069 11.1132 15.4186 11.16 15.4287 11.2072L19.8079 10.2242C19.7453 9.94505 19.6684 9.66958 19.5766 9.3989L17.6297 9.8357V9.83623Z" fill="black"/>
      <path d="M19.8796 13.343L16.8867 12.5383C16.7742 12.7363 16.6505 12.9279 16.5162 13.1105L15.4059 12.8122C15.3995 12.8372 15.3931 12.8616 15.3862 12.8865L19.7204 14.0515C19.7847 13.8159 19.8372 13.5797 19.8791 13.3424L19.8796 13.343Z" fill="black"/>
      <path d="M16.1782 13.5293C16.0412 13.6837 15.8958 13.8307 15.7429 13.9693L15.0975 13.6131C15.0874 13.6322 15.0768 13.6513 15.0662 13.6704L18.996 15.8386C19.1016 15.647 19.2003 15.4501 19.2916 15.2473L16.1776 13.5293H16.1782Z" fill="black"/>
      <path d="M15.3682 14.2824C15.2206 14.3955 15.0673 14.5011 14.9091 14.5998L14.6039 14.318C14.5928 14.3307 14.5811 14.3429 14.5694 14.3557L17.8665 17.4017C18.0013 17.2568 18.1308 17.1061 18.255 16.95L15.3682 14.283V14.2824Z" fill="black"/>
      <path d="M16.8273 18.3406L14.5089 14.827C14.4171 14.8742 14.3242 14.9188 14.2297 14.9612C14.2297 14.9612 14.0594 15.0345 14.0206 15.0504L16.3937 18.6463C16.5417 18.5492 16.6861 18.4473 16.8278 18.3406H16.8273Z" fill="black"/>
      <path d="M13.6268 15.1916C13.5875 15.2038 13.3386 15.276 13.2649 15.294C13.2649 15.294 13.1953 15.311 13.1762 15.3153L14.665 19.5024C14.8115 19.4504 14.9564 19.3947 15.0997 19.3342L13.6268 15.1911V15.1916Z" fill="black"/>
      <path d="M12.732 15.3949C12.6014 15.423 12.4693 15.4432 12.3355 15.4565L12.7835 19.9228C12.9167 19.9096 13.0494 19.893 13.181 19.8734L12.732 15.3954V15.3949Z" fill="black"/>
      <path d="M11.8238 15.4681C11.7123 15.4623 11.6009 15.4517 11.4894 15.4352L10.8552 19.8793C10.9661 19.8952 11.0775 19.9089 11.1885 19.9207L11.8238 15.4686V15.4681Z" fill="black"/>
      <path d="M6.59211 12.6243C6.625 12.5097 6.66162 12.3961 6.70143 12.2846C6.74337 12.1673 6.78848 12.0522 6.83784 11.9386L8.48904 11.9731C8.48904 11.9396 8.48904 11.9067 8.4901 11.8733L4.00199 11.7794C3.99616 12.0442 4.00306 12.3085 4.02375 12.5707L6.59263 12.6243H6.59211Z" fill="black"/>
      <path d="M10.0574 19.7211L10.1025 19.6091C9.85358 19.5157 9.61262 19.4048 9.38067 19.279L10.9777 15.3201C10.8806 15.2903 10.7835 15.2558 10.6874 15.2171C10.6826 15.215 10.6779 15.2134 10.6736 15.2112L8.99481 19.3735C8.99959 19.3756 9.00437 19.3772 9.00862 19.3793C9.35467 19.5189 9.70497 19.6325 10.0574 19.7211Z" fill="black"/>
      <path d="M8.45137 18.6495C8.25128 18.4834 8.06233 18.304 7.88611 18.1124L10.1647 14.9543C10.085 14.9055 10.0076 14.854 9.93325 14.7999L7.30652 18.4398C7.58835 18.6437 7.88611 18.831 8.19874 18.9993L8.45137 18.649V18.6495Z" fill="black"/>
      <path d="M7.24543 17.2727C7.10956 17.0562 6.98801 16.8301 6.88132 16.5955L9.47037 14.3965C9.41623 14.3403 9.36423 14.2824 9.3138 14.2224L5.89252 17.1284C6.10429 17.3789 6.33199 17.6172 6.57508 17.8417L7.2449 17.2727H7.24543Z" fill="black"/>
      <path d="M5.29178 16.3173L6.55871 15.6858C6.49502 15.4432 6.44671 15.1943 6.41486 14.94L8.94022 13.6811C8.90944 13.6259 8.87971 13.5701 8.85212 13.5139L4.83533 15.5159C4.97173 15.7914 5.12406 16.0589 5.29178 16.3173Z" fill="black"/>
      <path d="M6.37026 14.0866C6.37556 13.835 6.39732 13.5866 6.43447 13.3435L8.60527 12.8563C8.59308 12.8096 8.58139 12.7628 8.57131 12.7156L4.19202 13.698C4.25465 13.9772 4.33161 14.2527 4.42343 14.5234L6.37078 14.0866H6.37026Z" fill="black"/>
      <path d="M4.12036 10.5798L7.11331 11.3844C7.22584 11.1865 7.3495 10.9949 7.48379 10.8123L8.59413 11.1106C8.6005 11.0856 8.60687 11.0612 8.61377 11.0363L4.27906 9.87073C4.21484 10.1064 4.16229 10.3426 4.12036 10.5798Z" fill="black"/>
      <path d="M7.82187 10.3935C7.9588 10.2391 8.10424 10.0921 8.2571 9.95353L8.9025 10.3097C8.91258 10.2905 8.9232 10.2714 8.93382 10.2523L5.00407 8.08365C4.89845 8.27526 4.79973 8.47218 4.70844 8.67493L7.82241 10.393L7.82187 10.3935Z" fill="black"/>
      <path d="M8.63235 9.64036C8.7799 9.52731 8.93329 9.4217 9.09145 9.32297L9.39664 9.60481C9.40779 9.59207 9.41946 9.57986 9.43115 9.56712L6.13406 6.52109C5.99924 6.66599 5.86974 6.81673 5.74554 6.97277L8.63235 9.63984V9.64036Z" fill="black"/>
      <path d="M7.17328 5.58217L9.49164 9.0958C9.58345 9.04856 9.67634 9.00398 9.77081 8.96153C9.77081 8.96153 9.94119 8.88828 9.97993 8.87236L7.60743 5.27646C7.45935 5.37359 7.31499 5.47549 7.17328 5.58217Z" fill="black"/>
      <path d="M10.3732 8.73117C10.4125 8.71898 10.6614 8.64678 10.7352 8.62874C10.7352 8.62874 10.8047 8.61175 10.8238 8.60752L9.33507 4.42035C9.18858 4.47236 9.0437 4.52809 8.90039 4.5886L10.3732 8.73172V8.73117Z" fill="black"/>
      <path d="M11.2681 8.5279C11.3987 8.49978 11.5309 8.47961 11.6646 8.46635L11.2172 4C11.084 4.01327 10.9513 4.02972 10.8196 4.04936L11.2687 8.52738L11.2681 8.5279Z" fill="black"/>
      <path d="M12.1768 8.45468C12.2883 8.46052 12.3997 8.47114 12.5112 8.48759L13.1449 4.04354C13.034 4.02761 12.9225 4.01381 12.8116 4.00214L12.1763 8.45415L12.1768 8.45468Z" fill="black"/>
      </svg>`,
    },
    createdAt: "2024-08-13T16:35:56Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "invert(1)",
    },
  },
  {
    tier: {
      name: "$1000 a month",
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
      login: "driz.link/mooncake",
      name: "Mooncake",
      avatarUrl: "/images/mooncake.png",
    },
    createdAt: "2024-08-13T16:35:56Z",
    isActive: true,
    imageType: ImageType.IMAGE,
    darkStyle: {
      filter: "invert(1)",
      padding: "9px",
    },
    lightStyle: {
      padding: "9px",
    }
  },
];
