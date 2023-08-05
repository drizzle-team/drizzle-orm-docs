import { ISponsor, ImageType } from '@/@types/Sponsors';
import zolplay from '@/public/images/zolplay.jpeg';
import kinde from '@/public/images/kinde.jpeg';

export const sponsorsData: ISponsor[] = [
  {
    tier: {
      name: '$100 a month',
      isOneTime: true,
    },
    sponsorEntity: {
      __typename: 'Organization',
      login: 'val.town',
      name: 'Val Town',
      avatarUrl: `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35.0234 89.5781H53.8125L67.6406 46.4531H50.8828L44.8281 76.6484H44.5156L38.2656 46.4531H21L35.0234 89.5781Z" fill="black"/>
    <path d="M98.9141 90.5156C100.607 90.5156 102.039 90.4505 103.211 90.3203C104.409 90.2161 105.438 90.0859 106.297 89.9297V78.7578C105.88 78.8099 105.464 78.862 105.047 78.9141C104.656 78.9401 104.161 78.9531 103.562 78.9531C101.922 78.9531 100.698 78.5755 99.8906 77.8203C99.1094 77.0651 98.7188 75.8151 98.7188 74.0703V58.0156H106.297V46.4531H98.7188V37H82.7031V46.4531H77V58.0156H82.7031V76.5312C82.7031 81.6094 84.0052 85.2161 86.6094 87.3516C89.2396 89.4609 93.3411 90.5156 98.9141 90.5156Z" fill="black"/>
    </svg>`,
    },
    createdAt: '2023-04-03T13:32:16Z',
    isActive: true,
    imageType: ImageType.SVG,
  },
  {
    tier: {
      name: '$150 a month',
      isOneTime: true,
    },
    sponsorEntity: {
      __typename: 'Organization',
      login: 'kinde',
      name: 'Kinde',
      avatarUrl: kinde.src,
    },
    createdAt: '2023-06-11T12:32:16Z',
    isActive: true,
    imageType: ImageType.IMAGE,
  },
  {
    tier: {
      name: '$100 a month',
      isOneTime: true,
    },
    sponsorEntity: {
      __typename: 'Organization',
      login: 'zolplay',
      name: 'Zolplay',
      avatarUrl: zolplay.src,
    },
    createdAt: '2023-06-11T13:32:16Z',
    isActive: true,
    imageType: ImageType.IMAGE,
  },
  {
    tier: {
      name: '$2500 a month',
      isOneTime: true,
    },
    sponsorEntity: {
      __typename: 'Organization',
      login: 'payloadcms.com',
      name: 'Payload',
      avatarUrl: '<svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5293 0L23 6.90096V19.9978L14.3608 25V11.9032L2.88452 5.00777L11.5293 0Z" fill="currentColor"></path><path d="M10.6559 24.2727V14.0518L2 19.0651L10.6559 24.2727Z" fill="currentColor"></path></svg>',
    },
    createdAt: '2023-06-11T13:32:16Z',
    isActive: true,
    imageType: ImageType.SVG,
  },
  {
    tier: {
      name: '$1,000 one time',
      isOneTime: true,
    },
    sponsorEntity: {
      __typename: 'Organization',
      login: 'turso.tech',
      name: 'Turso',
      avatarUrl: 'https://avatars.githubusercontent.com/u/89849441?v=4',
    },
    createdAt: '2023-12-21T15:51:27Z',
    isActive: false,
    imageType: ImageType.IMAGE,
  },
];

export default sponsorsData;
