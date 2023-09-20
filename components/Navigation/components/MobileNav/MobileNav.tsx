import React, { FC } from 'react';
import styles from './MobileNav.module.css';
import MobileNavItem from './MobileNavItem/MobileNavItem';
import DiscordLink from '@/components/Icons/DiscordLink';
import GithubLink from '@/components/Icons/GithubLink';
import TwitterLink from '@/components/Icons/TwitterLink';

interface Props {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}
const MobileNav :FC<Props> = ({ isOpened, setIsOpened }) => (
  <div className={`${styles.nav_wrap} ${isOpened ? styles.open : styles.close} nav-container`}>
    <div className={styles.nav_items}>
      <MobileNavItem setIsOpened={setIsOpened} value="Drizzle ORM" href="/docs/overview" activeKeywords={['/docs']} />
      <MobileNavItem setIsOpened={setIsOpened} value="Drizzle Kit" href="/kit-docs/overview" activeKeywords={['/kit-docs']} />
      <MobileNavItem setIsOpened={setIsOpened} value="Drizzle Studio" href="/drizzle-studio/overview" activeKeywords={['/drizzle-studio']} />
    </div>
    <div className={styles.nav_socials}>
      <GithubLink />
      <DiscordLink />
      <TwitterLink />
    </div>
  </div>
);

export default MobileNav;
