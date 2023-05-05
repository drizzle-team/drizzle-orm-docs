import React, { ReactNode, useState } from 'react';
import styles from './Code.module.css';

interface Props {
  children: ReactNode[];
  fileNames: string[];
}

const Section: React.FC<Props> = ({ children, fileNames }) => {
  const [currentFile, setCurrentFile] = useState<any>(0);
  const changeFile = (index: number) => {
    setCurrentFile(index);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        {fileNames.map((f, index) => (
          <div
            key={index}
            className={index === currentFile ? styles.active_tab : styles.tab}
            onClick={() => changeFile(index)}
          >
            {f}
          </div>
        ))}
      </div>
      <div className={styles.codeBlock}>
        {children[currentFile]}
      </div>
    </div>
  );
};

export default Section;
