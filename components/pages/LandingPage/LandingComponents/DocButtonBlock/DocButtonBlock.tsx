import React from 'react';
import Link from 'next/link';
import styles from './DocButtonBlock.module.css';

const DocButtonBlock:React.FC = () => (
  <div className={styles.wrap}>
    <Link href="./docs/quick-start">
      <div className={styles.button}>Documentation</div>
    </Link>
  </div>
);

export default DocButtonBlock;
