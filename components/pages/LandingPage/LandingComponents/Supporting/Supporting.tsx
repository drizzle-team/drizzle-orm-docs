import React, { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';
import styles from './Supporting.module.css';
import LiveOnTheEdge from './Images/LiveOnTheEdge.png';
import LiveOnTheEdgeDark from './Images/LiveOnTheEdgeDark.png';
import ConnectEverywhere from './Images/ConnectEverywhere.png';
import ConnectEverywhereDark from './Images/ConnectEverywhereDark.png';
import { ISupportingElement } from '@/@types/Supporting';
import SupportingElement from './SupportingElement/SupportingElement';

interface Props {
  title: string,
  description: string,
  items: string[],
  rowsNum: number,
  data: { [key: string]: ISupportingElement },
  imageType: string,
}
const Supporting: React.FC<Props> = ({
  title, description, items, data, imageType, rowsNum,
}) => {
  const { theme } = useTheme();
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    setIsLight(theme === 'light');
  }, [theme]);
  const images: {
    [key: string]: StaticImageData;
  } = {
    liveontheedge: isLight ? LiveOnTheEdge : LiveOnTheEdgeDark,
    connecteverywhere: isLight ? ConnectEverywhere : ConnectEverywhereDark,
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.leftside}>
        <div className={styles.text_block}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <img className={`${styles.image} ${imageType === 'connecteverywhere' ? styles.bigImage : ''}`} src={images[imageType].src} alt="live on the edge" />
      </div>
      <div className={styles.scroll}>
        <div className={styles.grid_wrapper}>
          <div className={`${styles.grid} ${styles[`grid-template-${rowsNum}`]}`}>
            {items.map((a) => (
              <SupportingElement key={a} item={data[a]} name={a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supporting;
