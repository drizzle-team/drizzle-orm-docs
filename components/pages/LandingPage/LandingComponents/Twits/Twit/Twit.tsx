import React from 'react';
import styles from './Twit.module.css';
import { IComment } from '../Comments';

interface Props {
  twit: IComment;
}

const Twit: React.FC<Props> = ({ twit }) => (
  <div className={styles.wrap}>
    <div className={styles.top}>
      <div className={styles.avatar_wrapper}>
        <img className={styles.avatar} src={twit.avatar} alt={twit.login} />
      </div>
      <div className={styles.name_wrapper}>
        <div className={styles.name}>{twit.name}</div>
        <div className={styles.login}>
          @
          {twit.login}
        </div>
      </div>
    </div>
    <div className={styles.content}>{twit.text}</div>
  </div>
);
export default Twit;
