import React, { useEffect, useRef } from 'react';

interface Props {
  isAvailable: boolean,
  setPage: () => void
}

const LeftButton: React.FC<Props> = ({ isAvailable, setPage }) => {
  const buttonRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    if (buttonRef.current) {
      if (isAvailable) {
        buttonRef.current.style.opacity = '1';
      } else {
        buttonRef.current.style.opacity = '0.5';
      }
    }
  }, [isAvailable]);
  return (
    <div ref={buttonRef} onClick={setPage}>
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polyline points="15 18 9 12 15 6" /></svg>
    </div>
  );
};

export default LeftButton;
