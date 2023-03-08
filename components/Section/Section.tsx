import React, { ReactNode } from 'react';
import styles from './Section.module.css';

interface Props {
  children: ReactNode;
}

const Section: React.FC<Props> = ({ children }) => (
  <div className={styles.wrapper}>
    {children}
  </div>
);

export default Section;
