import React, { FC } from 'react';
import styles from './MobileNav.module.css';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import MobileNavItem from './MobileNavItem/MobileNavItem';

interface Props {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}
const MobileNav :FC<Props> = ({ isOpened, setIsOpened }) => (
  <div className={`${styles.nav_wrap} ${isOpened ? styles.open : styles.close}`}>
    <div className={styles.nav_items}>
      <MobileNavItem setIsOpened={setIsOpened} value="Pricing" href="/#pricing" activeKeywords={['/#pricing']} />
      <MobileNavItem setIsOpened={setIsOpened} value="Studio" href="/drizzle-studio/overview" activeKeywords={['drizzle-studio']} />
      <MobileNavItem setIsOpened={setIsOpened} value="Documentation" href="/docs/quick-start" activeKeywords={['kit-docs', 'docs']} />
    </div>
    <div className={styles.toggle_wrap}>
      <ThemeToggle />
    </div>
  </div>
);

export default MobileNav;
