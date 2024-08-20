import { type FC, useEffect, useRef, useState } from "react";

import styles from "./RuntimeSelector.module.css";
import { useBenchmarkContext } from "@components/LandingPage/Benchmark/context/useBenchmarkContext.tsx";

interface Item {
  value: "node-22" | "node-18" | "bun";
  name: string;
}

const RuntimeSelector: FC = () => {
  const { selectedItems, setSelectedItems } = useBenchmarkContext();
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null!);

  const toggle = () => {
    setIsOpened(!isOpened);
  };

  const items: Item[] = [
    { value: "node-22", name: "Node 22" },
    { value: "node-18", name: "Node 18" },
    { value: "bun", name: "Bun" },
  ];

  const handleClick = (item: Item) => {
    setSelectedItems({ ...selectedItems, runtime: item.value });
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
        <div>{items.find((i) => i.value === selectedItems.runtime)!.name}</div>
      </div>
      {isOpened && (
        <div className={styles["items-wrap"]}>
          <div className={styles.block}>
            <div className={styles.items}>
              {items.map((item) => (
                <div
                  className={
                    selectedItems.runtime === item.value
                      ? styles["active-item"]
                      : styles.item
                  }
                  key={item.value}
                  onClick={() => handleClick(item)}
                >
                  <div className={styles.text}>{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuntimeSelector;
