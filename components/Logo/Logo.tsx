import React, { useMemo } from 'react';
import useGetTheme from '../hooks/useGetTheme';
import styles from './Logo.module.css';
import DrizzleLogo from '../Icons/DrizzleLogo';

const Logo = () => {
  const isLight = useGetTheme();

  const logoStyle = useMemo(() => (isLight ? 'logo_white' : 'logo_green'), [isLight]);
  return (
    <div className={styles.logo}>
      <div className={styles[logoStyle]}>
        <DrizzleLogo />
      </div>
      <span>
        Drizzle ORM
      </span>
    </div>
  );
};

export default Logo;
