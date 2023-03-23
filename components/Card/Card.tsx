import React, { useRef } from 'react';
import styles from './Card.module.css';
import images from '../../assets/images/images';

interface Item {
  title: string;
  description: string;
  href: string;
}

interface ItemWithIcon extends Item {
  icon: string;
}

interface ItemWithImage extends Item {
  image: string;
}

interface Props {
  child: ItemWithIcon | ItemWithImage
}

const Card:React.FC<Props> = ({
  child,
}) => {
  const {
    title, description, href,
  } = child;
  let icon: null | string = null;
  let isTheme = false;
  let image: null | string = null;
  const imgRef = useRef<HTMLDivElement>(null!);
  if ('image' in child) {
    image = child.image;
    if (images[`${image}-dark`]?.src && images[`${image}-light`]?.src) {
      isTheme = true;
    }
  }
  if ('icon' in child) {
    icon = child.icon;
  }
  return (
    <a href={href}>
      <div className={styles.wrap}>
        <div className={styles.icon}>
          {icon && <div>{icon}</div>}
          {image && (
          <div ref={imgRef}>
            {
              isTheme ? (
                <>
                  <img className={styles.img_light} src={images[`${image}-dark`].src} alt={title} />
                  <img className={styles.img_dark} src={images[`${image}-light`].src} alt={title} />
                </>
              )
                : <img src={images[image].src} alt={title} />
            }

          </div>
          )}
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
