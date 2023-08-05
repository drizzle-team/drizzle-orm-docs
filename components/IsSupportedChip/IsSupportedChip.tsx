import React from 'react';
import styles from './IsSupportedChip.module.css';
import { XIcon, CheckIcon } from '../Icons/Icons';

interface Props {
  isSupported: boolean;
  text: string;
}

const IsSupportedChip:React.FC<Props> = ({ isSupported, text }) => (
  <div className={`${styles['is-supported-chip']} ${isSupported ? styles['is-supported-yes'] : styles['is-supported-no']}`}>
    {isSupported
      ? <CheckIcon />
      : <XIcon />}
    <div className={styles['is-supported-text']}>{text}</div>
  </div>
);

export default IsSupportedChip;
