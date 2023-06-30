import styles from './DrizzleStudio.module.css';
import DrizzleImgLight from './images/drizzle-studio-light.png';
import DrizzleImgDark from './images/drizzle-studio-dark.png';
import useGetTheme from '../../../../hooks/useGetTheme';

const DrizzleStudio = () => {
  const isLight = useGetTheme();
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>Drizzle Studio</div>
      <div className={styles.buttons}>
        <a className={styles.button} href="https://github.com/drizzle-team/drizzle-orm">
          Documentation
        </a>
        <a className={styles.button} href="https://github.com/drizzle-team/drizzle-orm">
          Live Demo
        </a>
      </div>
      <div className={styles.image_wrap}>
        <img className={styles.image} src={!isLight ? DrizzleImgDark.src : DrizzleImgLight.src} alt="Drizzle Studio" />
      </div>
    </div>
  );
};

export default DrizzleStudio;
