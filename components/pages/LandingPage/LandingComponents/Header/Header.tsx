import React from 'react';

import { useTheme } from 'next-themes';
import Typer from './Typer/Typer';
import styles from './Header.module.css';
import MainPic from './Images/MainPic.png';
import MainPicDark from './Images/MainPic_dark.png';
import SecondPic from './Images/SecondPic.png';
import SecondPicDark from './Images/SecondPic_dark.png';
import ParticlePic from './Images/ParticlePic.png';
import ParticlePicDark from './Images/ParticlePic_dark.png';

const Header = () => {
  const { theme } = useTheme();
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.typing}>
          <h1>TypeScript ORM that</h1>
          <Typer />
        </div>
        <div className={styles.picture_wrapper}>
          <img className={styles.text_image} src={theme === 'light' ? SecondPic.src : SecondPicDark.src} alt="Second" />
        </div>
      </div>
      <div className={styles.picture_wrapper}>
        <div className={styles.picture_block}>
          <img className={styles.addition_image} src={theme === 'light' ? SecondPic.src : SecondPicDark.src} alt="Second" />
          <img className={styles.picture} src={theme === 'light' ? MainPic.src : MainPicDark.src} alt="Main" />
          <img className={styles.particle} src={theme === 'light' ? ParticlePic.src : ParticlePicDark.src} alt="Particle" />
        </div>
      </div>
    </div>
  );
};

export default Header;
