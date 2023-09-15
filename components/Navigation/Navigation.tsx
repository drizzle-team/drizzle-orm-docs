import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Navigation.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Logo from '../Logo/Logo';
import NavItem from './components/NavItem/NavItem';
import SearchBar from './components/SearchBar/SearchBar';
import BurgerIcon from '../Icons/BurgerIcon';
import MobileNav from './components/MobileNav/MobileNav';
import Socials from './components/Socials/Socials';

const Navigation = () => {
  const router = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const toggleMenu = () => {
    if (isOpened) {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
    }
    setIsOpened((prev) => !prev);
  };

  const navigateToMainPage = () => {
    if (isOpened) {
      toggleMenu();
    }
    if (router.pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <>
      <div className={styles.nav_container}>
        <div className={styles.nav_container_blur} />
        <div className={styles.nav_content_wrap}>
          <div onClick={navigateToMainPage} className={styles.nav_logo}>
            <Logo />
          </div>
          <div className={styles.nav_desktop}>
            <NavItem value="Pricing" href="/#pricing" activeKeywords={['/#pricing']} />
            <NavItem value="Studio" href="/drizzle-studio/overview" activeKeywords={['drizzle-studio']} />
            <NavItem value="Documentation" href="/docs/quick-start" activeKeywords={['kit-docs', 'docs']} />
            <SearchBar />
            <Socials />
            <ThemeToggle />
          </div>
          <div className={styles.nav_mobile}>
            <div className={styles.toggle}>
              <ThemeToggle />
            </div>
            <div onClick={toggleMenu} className={`${styles.burger} ${isOpened ? styles.open : styles.close}`}>
              <BurgerIcon />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.nav_mobile}>
        <MobileNav isOpened={isOpened} setIsOpened={setIsOpened} />
      </div>
    </>
  );
};

export default Navigation;
