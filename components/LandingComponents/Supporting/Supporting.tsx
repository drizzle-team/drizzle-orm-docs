import React from 'react';
import CheckIcon from '../../CheckIcon';
import styles from './Supporting.module.css';

const Supporting = () => {
  const libraries: string[] = ['PlanetScale', 'Neon', 'PlanetScale', 'Neon', 'PlanetScale', 'Neon', 'PlanetScale', 'Neon', 'PlanetScale', 'Neon'];
  return (
    <div>
      <h1 className={styles.header}>Supporting</h1>
      <div className={styles.wrap}>
        {libraries
      && libraries.map((lib, key) => (
        <div className={styles.item} key={key}>
          <div className={styles.item_icon}>
            <CheckIcon />
          </div>
          <div className={styles.item_text}>
            {lib}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Supporting;
