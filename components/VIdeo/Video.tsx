import { FC } from 'react';
import styles from './Video.module.css';

interface IProps {
  videoId: string;
}

const Video: FC<IProps> = (props) => {
  const { videoId } = props;
  const videoURL = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      className={styles.video}
      title="Video"
      width="100%"
      src={videoURL}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default Video;
