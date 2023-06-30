import styles from './DrizzleStudio.module.css';
import DrizzleImgLight from './images/drizzle-studio-light.png';
import DrizzleImgDark from './images/drizzle-studio-dark.png';
import useGetTheme from '../../../../hooks/useGetTheme';

const DrizzleStudio = () => {
  const isLight = useGetTheme();
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Drizzle Studio</div>
      <div className={styles.buttons}>
        <a className={styles.button} href="https://github.com/drizzle-team/drizzle-orm">
          Live Demo
        </a>
      </div>
      <div>
        <img className={styles.image} src={!isLight ? DrizzleImgDark.src : DrizzleImgLight.src} alt="Drizzle Studio" />
      </div>
      <div className={styles.docs}>
        The easiest way to explore and
        manipulate your data in all of your Drizzle projects.
        <span className={styles.link}>
          <a href="https://github.com/drizzle-team/drizzle-orm">
            Head over to the docs
          </a>
        </span>
        to learn more!
      </div>
    </div>
  );
};

export default DrizzleStudio;
