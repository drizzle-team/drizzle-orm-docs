import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';
import styles from './Supporting.module.css';
import { SVGProps } from '../../../../../@types/SVGTypes';
import LiveOnTheEdge from './Images/LiveOnTheEdge.png';
import ConnectEverywhere from './Images/ConnectEverywhere.png';
// import ConnectEverywhereDark from './Images/ConnectEverywhereDark.png';

interface Props {
  title: string,
  description: string,
  items: string[],
  data: { [key: string]: {
    src: string,
    srcDark?: string,
    lightStyles?: SVGProps,
    darkStyles?: SVGProps,
  } },
  imageType: string,
}
const Supporting: React.FC<Props> = ({
  title, description, items, data, imageType,
}) => {
  const { theme } = useTheme();
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    setIsLight(theme === 'light');
  }, [theme]);
  const images: {
    [key: string]: StaticImageData;
  } = {
    liveontheedge: LiveOnTheEdge,
    connecteverywhere: isLight ? ConnectEverywhere : ConnectEverywhere,
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
      <div className={styles.grid}>
        {items.map((a, index) => {
          const {
            lightStyles,
            darkStyles,
          } = data[a];
          return (
            <div className={styles.item} key={index}>
              <div className={styles.icon}>
                <div className={styles.img_block}>
                  {data[a].src.includes('.svg') ? (
                    <>
                      {isLight ? <SVG src={`/svg/${data[a].src}`} {...lightStyles} />
                        : <SVG src={`/svg/${data[a].srcDark || data[a].src}`} {...darkStyles} />}
                    </>
                  ) : (
                    <img
                      src={isLight ? `/svg/${data[a].src}` : `/svg/${data[a].srcDark || data[a].src}`}
                      style={isLight ? { ...lightStyles } : { ...darkStyles as any }}
                      alt={a}
                    />
                  )}
                </div>
              </div>
              {a}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Supporting;
