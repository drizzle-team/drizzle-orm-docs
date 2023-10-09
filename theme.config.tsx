import { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';
import TitleComponent from './components/TitleComponent/TitleComponent';
import Footer from './components/Footer/Footer';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';

const config: DocsThemeConfig = {
  banner: {
    key: 'rqb',
    text: (
      <a href="https://driz.li/payload2.0" target="_blank" rel="nofollow noreferrer">
        🎉 Payload is now powered by Drizzle! Read more →
      </a>
    ),
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s - DrizzleORM',
        description: 'Drizzle ORM | %s',
      };
    }
    return {
      titleTemplate: 'DrizzleORM - next gen TypeScript ORM',
      description: 'Drizzle ORM is a lightweight and performant TypeScript ORM with developer experience in mind',
    };
  },
  logo: <Logo />,
  docsRepositoryBase: 'https://github.com/drizzle-team/drizzle-orm',
  gitTimestamp: <></>,
  main: ({ children }) => <div style={{ maxWidth: 1024, margin: '0 auto' }}>{children}</div>,
  navbar: {
    component: <Navigation />,
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
      <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
    </>
  ),
  footer: {
    component: <Footer />,
  },
};

export default config;
