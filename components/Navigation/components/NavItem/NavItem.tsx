import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import containsSubstringFromArray from '@/utils/containsSubstringFromArray';
import styles from './NavItem.module.css';

interface Props {
  value: string;
  href: string;
  activeKeywords: string[];
}

const NavItem:FC<Props> = ({
  value,
  href,
  activeKeywords,
}) => {
  const router = useRouter();

  const asPath = router.isReady ? router.asPath : '';

  return (
    <Link
      href={href}
      className={
        containsSubstringFromArray(asPath, activeKeywords)
          ? styles.item_wrap_active : styles.item_wrap
      }
    >
      {value}
    </Link>
  );
};

export default NavItem;
