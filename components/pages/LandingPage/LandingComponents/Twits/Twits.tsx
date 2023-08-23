import React from 'react';
import styles from './Twits.module.css';
import { Comments } from './Comments';
import Twit from './Twit/Twit';
import TwitPlaceholder from './TwitPlaceholder/TwitPlaceholder';

const Twits = () => (
  <div className={styles.wrap}>
    <div className={styles.header}>Developers love Drizzle ORM!</div>
    <div className={styles.grid_scroll}>
      <div className={styles.grid_wrapper}>
        <div className={styles.grid}>
          {Comments.map((c, index) => {
            if (c.name) {
              return <Twit key={index} twit={c} />;
            }
            return <TwitPlaceholder key={index} />;
          })}
        </div>
      </div>
    </div>
  </div>
);
export default Twits;
