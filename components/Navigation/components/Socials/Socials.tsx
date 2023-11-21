import React from 'react';

import styles from './Socials.module.css';
import { DiscordIcon, GithubIcon, TwitterIcon } from '@/components/Icons/Icons';

const Socials = () => (
  <div className={styles['socials-wrap']}>
    <a href="https://github.com/drizzle-team/drizzle-orm" target="_blank" rel="noreferrer" className={`nx-p-2 nx-text-current ${styles['socials-item']}`}>
      <GithubIcon />
    </a>
    <a
      href="https://discord.gg/yfjTbVXMW4"
      target="_blank"
      rel="noreferrer"
      className={`nx-p-2 nx-text-current ${styles['socials-item']}`}
    >
      <DiscordIcon />
    </a>
    <a
      target="_blank"
      href="https://mobile.twitter.com/DrizzleORM"
      aria-label="Drizzle twitter"
      rel="nofollow noreferrer"
      className={styles['socials-item']}
    >
      <TwitterIcon />
    </a>
  </div>
);

export default Socials;
