import React from 'react';
import SVG from 'react-inlinesvg';
import styles from './SupportingV2.module.css';
import { SVGProps } from '../../../../../@types/SVGTypes';

interface Props {
  title: string,
  description: string,
  items: string[],
  data: { [key: string]: {
    image: string,
    lightIcon?: SVGProps,
    darkIcon?: SVGProps,
    isImage?: boolean,
  } },
}
const SupportingV2: React.FC<Props> = ({
  title, description, items, data,
}) => (
  <div className={styles.wrap}>
    <div className={styles.text_block}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
    <div className={styles.grid}>
      {items.map((a, index) => {
        const {
          lightIcon, darkIcon,
        } = data[a];
        return (
          <div className={styles.item} key={index}>
            <div className={styles.icon}>
              <div className={styles.img_light}>
                {data[a].isImage ? <img src={`/svg/${data[a].image}.png`} style={{ ...lightIcon as any }} alt={a} />
                  : <SVG src={`/svg/${data[a].image}.svg`} {...lightIcon} />}
              </div>
              <div className={styles.img_dark}>
                {data[a].isImage ? <img src={`/svg/${data[a].image}.png`} style={{ ...darkIcon as any }} alt={a} />
                  : <SVG src={`/svg/${data[a].image}.svg`} {...darkIcon} />}
              </div>
            </div>
            {a}
          </div>
        );
      })}
    </div>
  </div>
);

export default SupportingV2;
