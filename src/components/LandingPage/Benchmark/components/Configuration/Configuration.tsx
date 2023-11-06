import React, { type FC, useEffect, useState } from "react";
import styles from "./Configuration.module.css";

import data from "../../configurationData";
import type { IModalInputDataItem, IParams } from "../../types";

interface IProps {
  selectedItems: IParams;
  setSelectedItems: (items: IParams) => void;
  isOpened: boolean;
}

const Configuration: FC<IProps> = ({
  selectedItems,
  setSelectedItems,
  isOpened,
}) => {
  const [currentTab, setCurrentTab] = React.useState<string>("orm");
  const [params, setParams] = useState<IParams | null>(null);

  const changeTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const selectItem = (option: IModalInputDataItem, item: string) => {
    if (option.disabled || !params) return;
    if (params[currentTab as keyof IParams] === item) return;
    setParams({
      ...selectedItems,
      [currentTab]: item,
    });
  };

  useEffect(() => {
    setParams({
      ...selectedItems,
    });
  }, []);

  useEffect(() => {
    if (params) {
      const isParamsChanged = Object.keys(params).some(
        (key) =>
          params[key as keyof IParams] !== selectedItems[key as keyof IParams],
      );
      if (isParamsChanged) {
        setSelectedItems({
          ...params,
        });
      }
    }
  }, [isOpened]);

  return (
    <div className={isOpened ? styles["wrap-opened"] : styles.wrap}>
      <div className={styles.tabs}>
        {Object.keys(selectedItems).map((item) => (
          <button
            type="button"
            className={currentTab === item ? styles["active-tab"] : styles.tab}
            key={item}
            onClick={() => changeTab(item)}
          >
            {data[item].value}
          </button>
        ))}
      </div>
      <div className={styles.options}>
        {params &&
          Object.keys(data[currentTab].items).map((item) => {
            const option = data[currentTab].items[item];
            return (
              <button
                type="button"
                className={
                  params[currentTab as keyof IParams] === item
                    ? styles["active-option"]
                    : styles.option
                }
                key={item}
                onClick={() => selectItem(option, item)}
                disabled={data[currentTab].items[item].disabled}
              >
                <div className={styles.text}>
                  <div className={styles.title}>
                    {option.value}
                    {!option.disabled && option.description && (
                      <div className={styles.description}>
                        → {option.description}
                      </div>
                    )}
                  </div>
                  {option.disabled && (
                    <div className={styles.disabled}>coming soon</div>
                  )}
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Configuration;
