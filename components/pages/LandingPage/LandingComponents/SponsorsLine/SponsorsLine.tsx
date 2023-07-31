import React, { useCallback, useEffect } from 'react';
import styles from './SponsorsLine.module.css';
import sponsorsHandler from '@/utils/sponsorsHandler';
import { ISponsor } from '@/@types/Sponsors';
import sponsorTypes from '@/data/sponsor-types';
import SponsorItem from './SponsorItem/SponsorItem';

const SponsorsLine = () => {
  const [sponsors, setSponsors] = React.useState<{
    name: string;
    items: ISponsor[];
  }[]>([]);
  const getSponsors = useCallback(async () => {
    const res = await sponsorsHandler();
    setSponsors(res);
  }, [sponsorsHandler]);

  useEffect(() => {
    getSponsors();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Our Sponsors
      </div>
      <div className={styles.wrapper}>
        <div className={styles.scroll}>
          {sponsors && sponsors.map((type) => (
            <div className={styles.sponsors}>
              <header className={styles.sponsors_header}>
                <div className={styles.type_header}>
                  <span className={styles.emoji}>{sponsorTypes[type.name].emoji}</span>
                  <span>
                    {`${sponsorTypes[type.name].header} sponsors`}
                  </span>
                </div>
              </header>
              <div className={`${styles.cards} ${styles[type.name]}`}>
                {type.items.map((sponsor) => (
                  <SponsorItem
                    sponsor={sponsor}
                    hasName={sponsorTypes[type.name].hasName}
                    hasCard={sponsorTypes[type.name].hasCard}
                    isUser={sponsor.sponsorEntity.__typename === 'User'}
                    imgSize={sponsorTypes[type.name].size}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorsLine;
