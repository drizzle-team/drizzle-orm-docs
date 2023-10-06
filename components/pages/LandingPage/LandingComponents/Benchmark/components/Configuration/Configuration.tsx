import React, { FC, useEffect, useState } from 'react';
import styles from './Configuration.module.css';

import data from './data';
import { IModalInputDataItem, IParams } from '../../types';

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
  const [currentTab, setCurrentTab] = React.useState<string>('traffic');
  const [params, setParams] = useState<IParams | null>(null);

  const changeTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const selectItem = (item: IModalInputDataItem) => {
    if (item.disabled || !params) return;
    if (params[currentTab as keyof IParams] === item.id) return;
    setParams({
      ...selectedItems,
      [currentTab]: item.id,
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
        (key) => params[key as keyof IParams] !== selectedItems[key as keyof IParams],
      );
      if (isParamsChanged) {
        setSelectedItems({
          ...params,
        });
      }
    }
  }, [isOpened]);

  return (
    <div className={isOpened ? styles['wrap-opened'] : styles.wrap}>
      <div className={styles.tabs}>
        {data.map((item) => (
          <button
            type="button"
            className={currentTab === item.key ? styles['active-tab'] : styles.tab}
            key={item.key}
            onClick={() => changeTab(item.key)}
          >
            {item.value}
          </button>
        ))}
      </div>
      <div className={styles.options}>
        {params
					&& data.find((item) => item.key === currentTab)?.items.map((item) => (
  <button
    type="button"
    className={params[currentTab as keyof IParams] === item.id ? styles['active-option'] : styles.option}
    key={item.id}
    onClick={() => selectItem(item)}
    disabled={item.disabled}
  >
    <div className={styles.text}>
      <div className={styles.title}>
        {item.value}
        {!item.disabled && item.description && (
        <div className={styles.description}>
          →
          {' '}
          {item.description}
        </div>
        )}
      </div>
      {item.disabled && <div className={styles.disabled}>coming soon</div>}
    </div>
  </button>
					))}
      </div>
    </div>
  );
};

export default Configuration;
