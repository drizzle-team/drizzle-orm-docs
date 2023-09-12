import React, { FC } from 'react';
import { useRouter } from 'next/router';

import containsSubstringFromArray from '@/utils/containsSubstringFromArray';
import styles from './MobileNavItem.module.css';

interface Props {
  setIsOpened: (isOpened: boolean) => void;
  value: string;
  href: string;
  activeKeywords: string[];
}

const MobileNavItem:FC<Props> = ({
  value,
  href,
  activeKeywords,
  setIsOpened,
}) => {
  const router = useRouter();

  const asPath = router.isReady ? router.asPath : '';

  const handleNavigation = () => {
    document.body.style.overflow = 'unset';
    setIsOpened(false);
    router.push(href);
  };
  return (
    <div
      onClick={handleNavigation}
      className={
        containsSubstringFromArray(asPath, activeKeywords)
          ? styles.nav_item_active : styles.nav_item
}
    >
      {value}
    </div>
  );
};

export default MobileNavItem;
