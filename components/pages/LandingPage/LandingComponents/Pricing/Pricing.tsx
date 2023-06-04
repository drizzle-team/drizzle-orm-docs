import { StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import styles from './Pricing.module.css';
import {
  DiscordIcon, GiftIcon, StarIcon, TwitterIcon,
} from '../../../../Icons/Icons';
import MoneyImage from './Images/Money.png';
import WithoutMoneyImage from './Images/WithoutMoney.png';

const Pricing = () => {
  const { theme } = useTheme();
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    setIsLight(theme === 'light');
  }, [theme]);
  const images: {
    [key: string]: StaticImageData;
  } = {
    withoutMoney: WithoutMoneyImage,
    money: MoneyImage,
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Pricing</div>
      <div className={styles.description}>
        Just joking, Drizzle is free&nbsp;and open-source
        <br />
        You can still make your contribution!
      </div>
      <div className={styles.blocks_wrap}>
        <div className={styles.left_block}>
          <div className={styles.image_wrap}>
            <img src={images.withoutMoney.src} alt="test" />
          </div>
          <div className={styles.buttons_wrap}>
            <a className={`${styles.button} ${styles.github}`} href="https://github.com/drizzle-team/drizzle-orm" target="_blank" rel="noreferrer nofollow">
              <StarIcon />
              Give us a star
            </a>
            <a className={`${styles.button} ${styles.twitter}`} target="_blank" href="https://mobile.twitter.com/DrizzleOrm" aria-label="Drizzle twitter" rel="nofollow noreferrer">
              <TwitterIcon />
              Subscribe on Twitter
            </a>
            <a className={`${styles.button} ${styles.discord}`} href="https://discord.gg/yfjTbVXMW4" target="_blank" rel="noreferrer">
              <DiscordIcon />
              Join our community
            </a>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.right_block}>
          <div className={styles.buttons_wrap_sponsor}>
            <p className={styles.buttons_description}>Buy us some ramen 🍜</p>
            <a className={`${styles.button}  ${styles.sponsor_button}`} href="https://github.com/sponsors/drizzle-team" rel="nofollow noreferrer" target="_blank">
              <GiftIcon />
              Become a sponsor
            </a>
          </div>
          <div className={styles.image_wrap}>
            <img src={images.money.src} alt="test" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
