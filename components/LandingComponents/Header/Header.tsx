import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <div className={styles.wrap}>
    <div className={styles.text_block}>
      <div className={styles.block_wrap}>
        <h1 className={styles.header}>Drizzle</h1>
        <p className={styles.text}>We do open-source for fun</p>
        <a className={styles.button} href="./docs/overview">Documentaion</a>
      </div>
    </div>
    <div className={styles.img_block}>
      <div className={styles.img_wrapper}>
        <img className={styles.image} src="https://cloud.drizzle.team/assets/illustration2x.ebc73b85.png" alt="drizzle" />
      </div>
    </div>
  </div>
);

export default Header;
