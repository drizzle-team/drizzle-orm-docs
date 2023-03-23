import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';

interface Props {
  children: any;
}

const Cards:React.FC<Props> = ({ children }) => (
  <div className={styles.cards}>
    {Object.keys(children).map((name, index) => <Card child={children[name]} key={index} />)}
  </div>
);

export default Cards;
