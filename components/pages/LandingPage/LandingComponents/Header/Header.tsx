import React from 'react';
import Typer from './Typer/Typer';
import styles from './Header.module.css';
import MainPic from './Images/MainPic_Halloween_dark.webp';
import SecondPicDark from './Images/SecondPic_Halloween_dark.webp';
import ParticlePicDark from './Images/ParticlePic_dark.webp';

const Header = () => (
  <div className={styles.wrap}>
    <div className={styles.content}>
      <div className={styles.typing}>
        <h1>TypeScript ORM that</h1>
        <Typer />
      </div>
      <div className={styles.picture_wrapper}>
        <img className={styles.text_image} src={SecondPicDark.src} alt="Second" />
      </div>
    </div>
    <div className={styles.picture_wrapper}>
      <div className={styles.picture_block}>
        <img className={styles.addition_image} src={SecondPicDark.src} alt="Second" />
        <div className={styles.mainpicture_wrapper}>
          <img className={styles.picture} src={MainPic.src} alt="Main" />
          <div className={styles.team}>
            <div className={styles.id}>id</div>
            <div>name</div>
            <div>twitter_handle</div>
            <div className={styles.id}>1</div>
            <div>Dan</div>
            <a
              className={styles.handle}
              href="https://twitter.com/bloberenober"
              target="_blank"
              data-text="@bloberenober"
              rel="noreferrer"
            >
              @bloberenober
            </a>
            <div className={styles.id}>2</div>
            <div>Andrew</div>
            <a
              className={styles.handle}
              href="https://twitter.com/andrii_sherman"
              target="_blank"
              data-text="@andrii_sherman"
              rel="noreferrer"
            >
              @andrii_sherman
            </a>
            <div className={styles.id}>3</div>
            <div>Alex</div>
            <a
              className={styles.handle}
              href="https://twitter.com/_alexblokh"
              target="_blank"
              data-text="@_alexblokh"
              rel="noreferrer"
            >
              @_alexblokh
            </a>
          </div>
          <img className={styles.particle} src={ParticlePicDark.src} alt="Particle" />
        </div>
      </div>
    </div>
  </div>
);

export default Header;
