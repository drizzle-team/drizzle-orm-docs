import Link from 'next/link';
import React from 'react';
import styles from './ToggleLib.module.css';
import {
  TerminalActiveIcon,
  TerminalIcon,
  CloudRainIcon,
  CloudRainActiveIcon,
  LayoutActiveIcon,
  LayoutIcon,
} from '../../Icons/Icons';

const ToggleLib = ({ title } : { title: string }) => (
  <div className={styles.wrap}>
    <Link href="/docs/quick-start">
      <div className={`${styles.button} ${title === 'DRIZZLE ORM' ? styles.selected : ''}`}>
        <div className={styles.icon}>
          {title === 'DRIZZLE ORM' ? <CloudRainActiveIcon /> : <CloudRainIcon /> }
        </div>
        <div className={styles.text}>Drizzle ORM</div>
      </div>
    </Link>
    <Link href="/kit-docs/overview">
      <div className={`${styles.button} ${title === 'DRIZZLE KIT' ? styles.selected : ''}`}>
        <div className={styles.icon}>
          {title === 'DRIZZLE KIT' ? <TerminalActiveIcon /> : <TerminalIcon /> }
        </div>
        <div className={styles.text}>Drizzle Kit</div>
      </div>
    </Link>
    <Link href="/drizzle-cloud/overview">
      <div className={`${styles.button} ${title === 'DRIZZLE CLOUD' ? styles.selected : ''}`}>
        <div className={`${styles.icon}`}>
          {title === 'DRIZZLE CLOUD' ? <LayoutActiveIcon /> : <LayoutIcon /> }
        </div>
        <div className={styles.text}>Drizzle Cloud</div>
      </div>
    </Link>
  </div>
);

export default ToggleLib;
