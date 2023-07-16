import { FC } from 'react';
import styles from './Video.module.css';

interface IProps {
  videoId: string;
}

const Video: FC<IProps> = (props) => {
  const { videoId } = props;
  const imglink = `https://i3.ytimg.com/vi/${videoId}/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIHBACGAYgATgB8AEB-AHuCIAC0AWKAgwIABABGH8gPigTMA8=&rs=AOn4CLB58ROFA_Vf6s9vUMYJH1AOPUVGYQ`;
  const link = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <a href={link} target="_blank" rel="nofollow noreferrer">
      <div className={styles.video}>
        <div className={styles.overlay} />
        <div className={styles.play_button}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play"><polygon points="5 3 19 12 5 21 5 3" /></svg>
        </div>
        <img src={imglink} alt="Drizzle Studio" />
      </div>
    </a>
  );
};

export default Video;
