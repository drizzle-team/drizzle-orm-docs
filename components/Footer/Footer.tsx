import DiscordLink from '../Icons/DiscordLink';
import GithubLink from '../Icons/GithubLink';
import TwitterLink from '../Icons/TwitterLink';
import styles from './Footer.module.css';

const Footer = () => (
  <div className={styles.wrap}>
    <div className={styles.container}>
      <GithubLink />
      <DiscordLink />
      <TwitterLink />
    </div>
  </div>
);

export default Footer;
