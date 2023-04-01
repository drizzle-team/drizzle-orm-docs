import React from 'react';
import SVG from 'react-inlinesvg';
import styles from './Card.module.css';
import { SVGProps } from '../../@types/SVGTypes';

interface Item {
  title: string;
  description: string;
  image: string;
  darkIcon?: SVGProps;
  lightIcon?: SVGProps;
  href: string;
}

interface Props {
  child: Item
}

const Card:React.FC<Props> = ({
  child,
}) => {
  const {
    title, description, href, lightIcon, darkIcon, image,
  } = child;
  return (
    <a href={href}>
      <div className={styles.wrap}>
        <div className={styles.icon}>
          <div className={styles.img_light}>
            <SVG src={`/svg/${image}.svg`} {...lightIcon} />
          </div>
          <div className={styles.img_dark}>
            <SVG src={`/svg/${image}.svg`} {...darkIcon} />
          </div>
        </div>
        <div>
          <h3 className={styles.header}>{title}</h3>
          {description && <div className={styles.description}>{description}</div>}
        </div>
      </div>
    </a>
  );
};

export default Card;
