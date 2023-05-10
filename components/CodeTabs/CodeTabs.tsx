import React, { ReactNode, useState } from 'react';
import styles from './CodeTabs.module.css';

interface CodeTabsProps {
  children: ReactNode[];
  items: string[];
}

interface CodeTabProps {
  children: ReactNode[];
}
const CodeTabs: React.FC<CodeTabsProps> = ({ children, items }) => {
  const [currentFile, setCurrentFile] = useState<any>(0);
  const changeFile = (index: number) => {
    setCurrentFile(index);
  };

  return (
    <div className={styles.codetabs_wrapper}>
      <div className={styles.codetabs_tabs}>
        {items.map((f, index) => (
          <div
            key={index}
            className={index === currentFile ? styles.codetabs_active_tab : styles.codetabs_tab}
            onClick={() => changeFile(index)}
          >
            {f}
          </div>
        ))}
      </div>
      <div className={styles.codetabs_codeBlock}>
        {children[currentFile]}
      </div>
    </div>
  );
};

const CodeTab: React.FC<CodeTabProps> = ({ children }) => (
  <div className={styles.codetab_wrapper}>{children}</div>
);

export { CodeTabs, CodeTab };
