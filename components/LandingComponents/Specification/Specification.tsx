import React from 'react';
import styles from './Specification.module.css';

const Specification = () => (
  <div>
    <h1 className={styles.header}>Specification</h1>
    <div className={styles.wrap}>
      <div className={styles.block_wrap}>
        <div className={styles.block}>
          <p className={styles.text}>
            18
            <span className={styles.accent}>kb</span>
          </p>
          <p className={styles.bottom_text}>gzipped</p>
        </div>
      </div>
      <div className={styles.block_wrap}>
        <div className={styles.block}>
          <p className={styles.text}>
            18
            <span className={styles.accent}>kb</span>
          </p>
          <p className={styles.bottom_text}>gzipped</p>
        </div>
      </div>
      <div className={styles.block_wrap}>
        <div className={styles.block}>
          <p className={styles.text}>
            18
            <span className={styles.accent}>kb</span>
          </p>
          <p className={styles.bottom_text}>gzipped</p>
        </div>
      </div>
    </div>
  </div>

);

export default Specification;
