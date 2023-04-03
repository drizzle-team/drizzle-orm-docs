import React from 'react';
import styles from './ToggleButton.module.css';

interface Props {
  isToggled: boolean;
  toggle: () => void;
  value: string;
}

const ToggleButton: React.FC<Props> = ({ isToggled, toggle, value }) => (
  <button className={`${styles.button} ${isToggled ? styles.pressed : ''}`} type="button" onClick={toggle}>
    {value}
  </button>
);

export default ToggleButton;
