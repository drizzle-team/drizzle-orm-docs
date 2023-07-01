import Image from 'next/image';
import styles from './DrizzleStudio.module.css';
import DrizzleImgLight from './images/drizzle-studio-light.png';
import DrizzleImgDark from './images/drizzle-studio-dark.png';
import useGetTheme from '../../../../hooks/useGetTheme';

const DrizzleStudio = () => {
  const isLight = useGetTheme();
  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <div className={styles.title}>Drizzle Studio</div>
        <div className={styles.description}>
          Explore and manipulate your data
        </div>
      </div>
      <div className={styles.gradient_container}>
        <div className={styles.image_container}>
          <Image
            className={styles.image}
            src={!isLight ? DrizzleImgDark.src : DrizzleImgLight.src}
            alt="Drizzle Studio"
            width={0}
            height={0}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div className={styles.image_container_separator} />
      </div>
      <div className={styles.buttons}>
        <a className={styles.button} href="/drizzle-studio/overview">
          Documentation
        </a>
        <a className={styles.button_accent} href="https://demo.drizzle.team/">
          Live demo
        </a>
      </div>
    </div>
  );
};

export default DrizzleStudio;
