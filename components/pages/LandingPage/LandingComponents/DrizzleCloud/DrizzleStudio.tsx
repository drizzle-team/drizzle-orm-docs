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
          The easiest way to explore and
          manipulate your data in all of your Drizzle projects.
        </div>
      </div>
      <div className={styles.image_container}>
        <img className={styles.image} src={!isLight ? DrizzleImgDark.src : DrizzleImgLight.src} alt="Drizzle Studio" />
      </div>
      <div className={styles.buttons}>
        <a className={styles.button_accent} href="https://github.com/drizzle-team/drizzle-orm">
          Live Demo
        </a>
        <a className={styles.button} href="https://github.com/drizzle-team/drizzle-orm">
          Documentation
        </a>
      </div>
    </div>
  );
};

export default DrizzleStudio;
