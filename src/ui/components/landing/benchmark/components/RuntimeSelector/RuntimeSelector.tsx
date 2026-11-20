import React, { type FC, useEffect, useRef, useState } from "react";

import styles from "./RuntimeSelector.module.css";
import { useBenchmarkContext } from "@components/landing/benchmark/context/useBenchmarkContext";
import BunIcon from "@components/landing/benchmark/components/RuntimeSelector/BunIcon";
import NodeIcon from "@components/landing/benchmark/components/RuntimeSelector/NodeIcon";
import { type IParams } from "../../types";

interface Item {
  value: IParams["runtime"];
  name: string;
}

interface Props {
  disabled?: boolean;
}

const RuntimeSelector: FC<Props> = ({ disabled }) => {
  const { selectedItems, setSelectedItems } = useBenchmarkContext();
  const resizerRef = useRef<HTMLDivElement | null>(null);
  const [selectWidth, setSelectWidth] = useState("109px");

  const items: Item[] =
    selectedItems.orm === "go-20261120"
      ? [
          { value: "bun-1.4.4-drizzle", name: "Bun v1.4.4 / Drizzle driver" },
          { value: "bun-1.4.4-bun-sql", name: "Bun v1.4.4 / Bun SQL" },
          { value: "bun-1.4.4-node-pg", name: "Bun v1.4.4 / node-postgres" },
          { value: "bun-1.3.13-drizzle", name: "Bun v1.3.13 / Drizzle driver" },
          { value: "bun-1.3.13-bun-sql", name: "Bun v1.3.13 / Bun SQL" },
          { value: "bun-1.3.13-node-pg", name: "Bun v1.3.13 / node-postgres" },
          { value: "node-26-drizzle", name: "Node v26.13.0 / Drizzle driver" },
          { value: "node-26-node-pg", name: "Node v26.13.0 / node-postgres" },
          { value: "node-24-drizzle", name: "Node v24.22.2 / Drizzle driver" },
          { value: "node-24-node-pg", name: "Node v24.22.2 / node-postgres" },
        ]
      : [
          { value: "bun-1.4.4", name: "Bun v1.4.4" },
          { value: "bun-1.3.13", name: "Bun v1.3.13" },
          { value: "node-26", name: "Node v26.13.0" },
          { value: "node-24", name: "Node v24.22.2" },
        ];
  const selectedItem = items.find(
    ({ value }) => value === selectedItems.runtime,
  );

  useEffect(() => {
    if (resizerRef.current) {
      setSelectWidth(`${resizerRef.current.offsetWidth}px`);
    }
  }, [selectedItem?.name]);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedItems({
      ...selectedItems,
      runtime: e.target.value as Item["value"],
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
        {selectedItem?.name}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {selectedItems.runtime.startsWith("bun") ? (
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
          disabled={disabled}
          value={selectedItems.runtime}
          style={{
            width: selectWidth,
            ...(disabled && {
              pointerEvents: "none",
              cursor: "not-allowed",
            }),
          }}
        >
          {items.map((item) => (
            <option
              key={item.value}
              value={item.value}
              // selected={selectedItems.runtime === item.value}
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
