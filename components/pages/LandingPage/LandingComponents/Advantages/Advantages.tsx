import React from 'react';

import styles from './Advantages.module.css';

const Advantages: React.FC = () => {
  const advantages: string[] = [
    'Edge ready, commonjs and ESM ready',
    'Performance',
    'Hassle-free SQL migrations',
    'No code generation',
    'Lightweight, zero dependencies, 9kb minified gzipped treeshakable',
    'Feature reach SQL dialects',
    'Meme game',
    'Community',
  ];
  return (
    <div className={styles.wrap}>
      {advantages.map((a, index) => (
        <div className={styles.item} key={index}>{a}</div>
      ))}
    </div>
  );
};

export default Advantages;
