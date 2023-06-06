import { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';
import TwitterIcon from './components/Icons/TwitterIcon';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import TitleComponent from './components/TitleComponent/TitleComponent';

const config: DocsThemeConfig = {
  banner: {
    key: 'rqb',
    text: (
      <a href="https://medium.com/@aleksandrblokh/best-typescript-orm-just-got-better-5a33688b8d2e?utm_source=drizzle-orm" target="_blank" rel="nofollow noreferrer">
        🎉 We&apos;ve built relational queries! Read more →
      </a>
    ),
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – DrizzleORM',
        description: 'Drizzle ORM | %s',
      };
    }
    return {
      titleTemplate: 'DrizzleORM - next gen TypeScript ORM',
      description: 'Drizzle ORM is a lightweigh and performant TypeScript ORM with developer experience in mind',
    };
  },
  logo: (
    <>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="5" fill="#17161B" />
        <path d="M8.10752 16.6577C8.44369 16.0953 9.19471 15.8957 9.78497 16.2118C10.3752 16.5279 10.5812 17.24 10.245 17.8024L6.29891 24.404C5.96274 24.9664 5.21172 25.1661 4.62146 24.85C4.0312 24.5339 3.82522 23.8217 4.16139 23.2593L8.10752 16.6577Z" fill="#C5F74F" />
        <path d="M16.6132 11.596C16.9494 11.0336 17.7004 10.8339 18.2907 11.15C18.8809 11.4661 19.0869 12.1783 18.7507 12.7407L14.8046 19.3423C14.4684 19.9047 13.7174 20.1043 13.1272 19.7882C12.5369 19.4721 12.3309 18.76 12.6671 18.1976L16.6132 11.596Z" fill="#C5F74F" />
        <path d="M29.7011 11.5962C30.0373 11.0339 30.7883 10.8342 31.3785 11.1503C31.9688 11.4664 32.1748 12.1786 31.8386 12.7409L27.8925 19.3425C27.5563 19.9049 26.8053 20.1046 26.215 19.7885C25.6248 19.4724 25.4188 18.7602 25.755 18.1978L29.7011 11.5962Z" fill="#C5F74F" />
        <path d="M21.1932 16.6577C21.5294 16.0953 22.2804 15.8957 22.8706 16.2118C23.4609 16.5279 23.6669 17.24 23.3307 17.8024L19.3846 24.404C19.0484 24.9664 18.2974 25.1661 17.7071 24.85C17.1169 24.5339 16.9109 23.8217 17.2471 23.2593L21.1932 16.6577Z" fill="#C5F74F" />
      </svg>
      <span style={{ marginLeft: '.4em', fontWeight: 800 }}>
        Drizzle ORM
      </span>
    </>),
  project: {
    link: 'https://github.com/drizzle-team/drizzle-orm',
  },
  chat: {
    link: 'https://discord.gg/yfjTbVXMW4',
  },
  docsRepositoryBase: 'https://github.com/drizzle-team/drizzle-orm',
  gitTimestamp: <></>,
  main: ({ children }) => <div style={{ maxWidth: 1024, margin: '0 auto' }}>{children}</div>,
  navbar: {
    extraContent:
  <>
    <TwitterIcon />
    <ThemeToggle />
  </>,
  },
  themeSwitch: {
  },
  darkMode: false,
  nextThemes: {
    defaultTheme: 'system',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    titleComponent: TitleComponent,
  },
  editLink: {
    text: '',
  },
  head: (
    <>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </>
  ),
  footer: {
    component: () => <div />,
  },
};

export default config;
