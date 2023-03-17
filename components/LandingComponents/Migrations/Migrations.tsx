import React, { ReactNode } from 'react';
import ArrowIcon from '../../ArrowIcon';
import styles from './Migration.module.css';

interface Props {
  children: ReactNode[];
}

const Migrations: React.FC<Props> = ({ children }) => (
  <div>
    <h1 className={styles.header}>Migrations</h1>
    <div className={styles.wrap}>
      <div className={styles.code}>
        {children && children[0]}
      </div>
      <div className={styles.icon}>
        <ArrowIcon />
      </div>
      <div className={styles.code}>
        {children && children[1]}
      </div>
    </div>
  </div>
);

export default Migrations;
