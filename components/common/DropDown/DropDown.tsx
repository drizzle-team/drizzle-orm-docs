import React, { useEffect, useRef, useState } from 'react';
import styles from './DropDown.module.css';
import ChevronDown from './Chevron-down';

interface Props {
  values: string[];
  value: string;
  setValue: (type: string) => void;
}

const DropDown: React.FC<Props> = ({ values, value, setValue }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const durationWrapper = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        !(event.target instanceof Element)
                  || !durationWrapper.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    }

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [dropdownVisible]);

  return (
    <div className={styles['drop-container']!}>
      <div ref={durationWrapper} className={styles['drop-content']!}>
        <button type="button" className={styles['open-button']!} onClick={() => setDropdownVisible((d) => !d)}>
          {value}
          <ChevronDown />
        </button>
        {
          dropdownVisible && (
          <div className={styles['drop-options']!}>
            {values.map((d) => (
              <button
                type="button"
                className={styles['drop-option']!}
                onClick={() => {
                  setValue(d);
                  setDropdownVisible(false);
                }}
              >
                {d}
              </button>
            ))}
          </div>
          )
        }
      </div>
    </div>
  );
};

export default DropDown;
