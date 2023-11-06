import { type FC, useEffect, useRef, useState } from "react";

import styles from "./SpeedSelector.module.css";

interface IProps {
  speed: number;
  setSpeed: (speed: number) => void;
}

const SpeedSelector: FC<IProps> = ({ speed, setSpeed }) => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null!);

  const toggle = () => {
    setIsOpened(!isOpened);
  };

  const items = [1, 2, 4, 8, 16, 32];

  const handleClick = (item: number) => {
    setSpeed(item);
    setIsOpened(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrap} ref={dropdownRef}>
      <div className={styles.button} onClick={toggle}>
        <div>{speed}X</div>
      </div>
      {isOpened && (
        <div className={styles["items-wrap"]}>
          <div className={styles.block}>
            <div className={styles.items}>
              {items.map((item) => (
                <div
                  className={
                    speed === item ? styles["active-item"] : styles.item
                  }
                  key={item}
                  onClick={() => handleClick(item)}
                >
                  <div className={styles.text}>{item}X</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedSelector;
