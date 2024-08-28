import React, { type FC, useRef } from "react";

import styles from "./RuntimeSelector.module.css";
import { useBenchmarkContext } from "@components/LandingPage/Benchmark/context/useBenchmarkContext.tsx";
import BunIcon from "@components/LandingPage/Benchmark/components/RuntimeSelector/BunIcon.tsx";
import NodeIcon from "@components/LandingPage/Benchmark/components/RuntimeSelector/NodeIcon.tsx";

interface Item {
  value: "node-22" | "node-18" | "node-20" | "bun";
  name: string;
}

const RuntimeSelector: FC = () => {
  const { selectedItems, setSelectedItems } = useBenchmarkContext();
  const resizerRef = useRef<HTMLDivElement | null>(null);

  const items: Item[] = [
    { value: "bun", name: "Bun v1.1.25" },
    { value: "node-22", name: "Node 22.6.0 (Current)" },
    { value: "node-20", name: "Node v20.16.0 (LTS)" },
    { value: "node-18", name: "Node v18.20.4 (LTS)" },
  ];

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedItems({
      ...selectedItems,
      runtime: e.target.value as "node-22" | "node-18" | "node-20" | "bun",
    });
  };

  return (
    <>
      <div
        ref={resizerRef}
        id={"resizer"}
        className={styles.button}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          visibility: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {items.find(({ value }) => value === selectedItems.runtime)!.name}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {selectedItems.runtime === "bun" ? (
          <div className={styles.icon}>
            <BunIcon />
          </div>
        ) : (
          <div className={styles.icon}>
            <NodeIcon />
          </div>
        )}
        <select
          className={styles.button}
          onChange={handleChange}
          defaultValue={selectedItems.runtime}
          style={{
            width: resizerRef.current
              ? `${resizerRef.current.offsetWidth}px`
              : "109px",
          }}
        >
          {items.map((item) => (
            <option
              key={item.value}
              value={item.value}
              selected={selectedItems.runtime === item.value}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default RuntimeSelector;
