import React from 'react';
import CheckIcon from '../../../../CheckIcon';
import styles from './Supporting.module.css';

interface Props {
  title: string,
  description: string,
  items: string[]
}
const Supporting: React.FC<Props> = ({ title, description, items }) => (
  <div className={styles.wrap}>
    <h1 className={styles.header}>{title}</h1>
    <p className={styles.description}>
      {description}
    </p>
    <div className={styles.items}>
      {items && items.map((item, key) => (
        <div className={styles.item} key={key}>
          <div className={styles.item_icon}>
            <CheckIcon />
          </div>
          <div className={styles.item_text}>
            {item}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Supporting;
