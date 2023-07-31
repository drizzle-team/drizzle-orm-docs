import React, { FC } from 'react';
import SVG from 'react-inlinesvg';

import { ISupportingElement } from '@/@types/Supporting';
import styles from './SupportingElement.module.css';
import useGetTheme from '@/components/hooks/useGetTheme';
import HeartIcon from '@/components/Icons/HeartIcon';

interface Props {
  item: ISupportingElement;
  name: string;
}

const SupportingElement:FC<Props> = ({ item, name }) => {
  const isLight = useGetTheme();
  const { lightStyles, darkStyles } = item;
  return (
    <>
      {item.sponsorUrl && (
      <a href={item.sponsorUrl} target="_blank" rel="nofollow noreferrer">
        <div className={styles.item}>
          <div className={styles.icon}>
            <div className={styles.img_block}>
              {item.src.includes('.svg') ? (
                <>
                  {isLight ? <SVG src={`/svg/${item.src}`} {...lightStyles} />
                    : <SVG src={`/svg/${item.srcDark || item.src}`} {...darkStyles} />}
                </>
              ) : (
                <img
                  src={isLight ? `/svg/${item.src}` : `/svg/${item.srcDark || item.src}`}
                  style={isLight ? { ...lightStyles } : { ...darkStyles as any }}
                  alt={name}
                />
              )}
            </div>
          </div>
          <div className={styles.our_sponsor}>
            our sponsor
            <HeartIcon />
          </div>
          {name}
        </div>
      </a>
      )}
      {!item.sponsorUrl && (
        <div className={styles.item}>
          <div className={styles.icon}>
            <div className={styles.img_block}>
              {item.src.includes('.svg') ? (
                <>
                  {isLight ? <SVG src={`/svg/${item.src}`} {...lightStyles} />
                    : <SVG src={`/svg/${item.srcDark || item.src}`} {...darkStyles} />}
                </>
              ) : (
                <img
                  src={isLight ? `/svg/${item.src}` : `/svg/${item.srcDark || item.src}`}
                  style={isLight ? { ...lightStyles } : { ...darkStyles as any }}
                  alt={name}
                />
              )}
            </div>
          </div>
          {name}
        </div>
      )}
    </>
  );
};

export default SupportingElement;
