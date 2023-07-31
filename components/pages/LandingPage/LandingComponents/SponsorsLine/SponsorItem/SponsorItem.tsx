import { FC } from 'react';
import styles from './SponsorItem.module.css';

import { ISponsor, ImageType } from '@/@types/Sponsors';

interface Props {
  sponsor: ISponsor;
  hasName: boolean;
  hasCard: boolean;
  isUser: boolean;
  imgSize: number;
}

const SponsorItem:FC<Props> = ({
  sponsor, hasName, hasCard, isUser, imgSize,
}) => {
  const imgSrc = sponsor.imageType === ImageType.SVG
    ? `data:image/svg+xml;base64,${btoa(sponsor.sponsorEntity.avatarUrl)}`
    : sponsor.sponsorEntity.avatarUrl;

  const imageWrapperStyles = {
    width: `${imgSize}px`,
    height: `${imgSize}px`,
  };

  return (
    <a
      href={sponsor.imageType
        ? `https://${sponsor.sponsorEntity.login}`
        : `https://github.com/${sponsor.sponsorEntity.login}`}
      target="_blank"
      rel="nofollow noreferrer"
    >
      <div id="card-wrapper" className={`${hasCard ? styles.styled_card : ''} ${hasName ? styles.with_name : ''}`}>
        <div style={imageWrapperStyles} id="img-wrapper" className={styles.card_image}>
          <img
            className={isUser ? styles['round-50'] : styles['round-20']}
            src={imgSrc}
            loading="lazy"
            alt={sponsor.sponsorEntity.name || sponsor.sponsorEntity.login}
          />
        </div>
        {hasName && (
          <div id="card-name" className={styles.card_name}>
            {sponsor.sponsorEntity.name}
          </div>
        )}
      </div>
    </a>
  );
};

export default SponsorItem;
