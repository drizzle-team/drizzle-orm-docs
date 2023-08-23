import styles from './TwitPlaceholder.module.css';

const TwitPlaceholder = () => (
  <div className={styles.wrap}>
    <div className={styles.content}>
      Vote for a tweet to be here
      <br />
      <a
        href="https://twitter.com/DrizzleOrm/status/1693626174600089730?s=20"
        target="_blank"
        rel="noreferrer nofollow"
        className={styles.learn_more}
      >
        Vote now
      </a>
    </div>
  </div>
);

export default TwitPlaceholder;
