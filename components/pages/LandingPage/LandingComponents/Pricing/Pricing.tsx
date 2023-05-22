import styles from './Pricing.module.css';
import { DiscordIcon, GithubIcon, TwitterIcon } from '../../../../Icons/Icons';

const Pricing = () => (
  <div className={styles.wrap}>
    <div className={styles.title}>Pricing</div>
    <div className={styles.description}>
      Omg, we’re just joking, Drizzle is open-source and free ofc
    </div>
    <div className={styles.buttons_wrap}>
      <div className={styles.leftside}>
        <div className={styles.buttons_description}>But you can help us grow</div>
        <a className={`${styles.button} ${styles.github}`} href="https://github.com/drizzle-team/drizzle-orm" target="_blank" rel="noreferrer nofollow">
          Give us a star on GitHub
          <GithubIcon />
        </a>
        <a className={`${styles.button} ${styles.twitter}`} target="_blank" href="https://mobile.twitter.com/DrizzleOrm" aria-label="Drizzle twitter" rel="nofollow noreferrer">
          Subscribe on Twitter
          <TwitterIcon />
        </a>
        <a className={`${styles.button} ${styles.discord}`} href="https://discord.gg/yfjTbVXMW4" target="_blank" rel="noreferrer">
          Join our Discord community
          <DiscordIcon />
        </a>
      </div>
      <div className={styles.rightside}>
        <div className={styles.buttons_description}>Become our fellow sponsor</div>
        <a className={`${styles.button} ${styles.github}`} href="https://github.com/sponsors/drizzle-team" rel="nofollow noreferrer" target="_blank">
          Sponsor on Github
          <GithubIcon />
        </a>
      </div>
    </div>
  </div>

);

export default Pricing;
