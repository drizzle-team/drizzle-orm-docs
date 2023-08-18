import { FC } from 'react';
import styles from './Video.module.css';

interface IProps {
  href: string;
  src: string;
}

const Video: FC<IProps> = ({
  href,
  src,
}) => {
  const videoProps = {
    backgroundImage: `url(${src})`,
  };
  return (
    <a href={href} target="_blank" rel="nofollow noreferrer">
      <div
        style={videoProps}
        className={styles.video}
      >
        <div className={styles.overlay} />
        <div className={styles.play_button}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play"><polygon points="5 3 19 12 5 21 5 3" /></svg>
        </div>
      </div>
    </a>
  );
};

export default Video;
