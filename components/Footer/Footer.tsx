import DiscordLink from '../Icons/DiscordLink';
import GithubLink from '../Icons/GithubLink';
import TwitterIcon from '../Icons/TwitterLink';
import styles from './Footer.module.css';

const Footer = () => (
  <div className={styles.wrap}>
    <div className={styles.container}>
      <GithubLink />
      <DiscordLink />
      <TwitterIcon />
    </div>
  </div>
);

export default Footer;
