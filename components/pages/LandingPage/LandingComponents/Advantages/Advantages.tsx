import React from 'react';

import styles from './Advantages.module.css';
import CheckIcon from '../../../../CheckIcon';

const Advantages: React.FC = () => {
  const advantages: string[] = [
    'Lightweight & edge ready',
    'Top-notch performance',
    'Hassle-free SQL migrations',
    'No code generation',
    'Zero dependencies',
    'Feature reach SQL dialects',
  ];
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>We&apos;ve got your back</div>
      <div className={styles.grid}>
        {advantages.map((a, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.svgBg}><CheckIcon /></div>
            {a}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;
