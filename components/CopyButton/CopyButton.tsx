import React, { useEffect, useRef, useState } from 'react';

import styles from './CopyButton.module.css';

interface Props {
  onClick: () => void;
}

const CopyButton:React.FC<Props> = ({ onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null!);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => () => {
    if (timeouts.length) {
      timeouts.forEach((id) => {
        clearTimeout(id);
      });
    }
  }, []);

  const pressHandler = () => {
    setIsPressed(true);
    onClick();
    if (timeouts.length) {
      timeouts.forEach((id) => {
        clearTimeout(id);
      });
    }
    setTimeouts([]);
    if (buttonRef.current) {
      buttonRef.current.style.opacity = '1';
      setTimeouts((prev) => [...prev, setTimeout(() => {
        buttonRef.current.style.opacity = '';
      }, 1500)]);
      setTimeouts((prev) => [...prev, setTimeout(() => {
        setIsPressed(false);
      }, 2000)]);
    }
  };

  return (
    <button type="button" className={styles['button-wrap']} ref={buttonRef} onClick={pressHandler} aria-label="Copy">
      {isPressed
        ? <svg viewBox="0 0 20 20" width="1em" height="1em" fill="currentColor" className="nx-pointer-events-none nx-h-4 nx-w-4"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="nx-pointer-events-none nx-h-4 nx-w-4">
            <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
    </button>
  );
};

export default CopyButton;
