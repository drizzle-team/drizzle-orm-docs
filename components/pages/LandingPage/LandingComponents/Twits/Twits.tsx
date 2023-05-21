import React from 'react';
import styles from './Twits.module.css';
import { Comments, TopThreeComments } from './Comments';
import Twit from './Twit/Twit';

const Twits = () => (
  <div className={styles.wrap}>
    <div className={styles.header}>Developers love Drizzle ORM!</div>
    <div className={styles.grid}>
      {Comments.map((c, index) => <Twit key={index} twit={c} />)}
    </div>
    <div className={styles.top_twits}>
      {TopThreeComments.map((c, index) => <Twit key={index} twit={c} />)}
    </div>
  </div>
);
export default Twits;
