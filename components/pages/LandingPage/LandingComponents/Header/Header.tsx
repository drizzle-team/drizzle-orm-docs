import React from 'react';
import { TypeAnimation } from 'react-type-animation';

import styles from './Header.module.css';

const Header = () => {
  const timeout = 3000;

  const typingText = [
    'that performs',
    'that lasts',
    'that talks the talk and walks the walk',
    'that does cool memes on Twitter',
    'that Dax should definitely try',
    'that\'s not as good as Django',
    'that\'s not as good as Laravel',
    'developers love / you will love',
    'that performs',
  ];
  return (
    <div className={styles.wrap}>
      <div className={styles.text_block}>
        <div className={styles.block_wrap}>
          <h1 className={styles.header}>Drizzle ORM</h1>
        </div>
      </div>
      <div className={styles.typing}>
        <div>TypeScript ORM</div>
        <div className={styles.scroller}>
          <span>
            {typingText.map((t) => (
              <>
                {t}
                <br />
              </>
            ))}
          </span>
        </div>
      </div>

    </div>
  );
};

export default Header;
