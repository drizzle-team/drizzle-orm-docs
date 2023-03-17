import React from 'react';
import Header from '../../LandingComponents/Header/Header';
import Performance from '../../LandingComponents/Performance/Performance';
import Specification from '../../LandingComponents/Specification/Specification';
import Supporting from '../../LandingComponents/Supporting/Supporting';
import styles from './LandingPage.module.css';

const LandingPage = () => (
  <div className={styles.wrap}>
    <Header />
    <Supporting />
    <Specification />
    <Performance />
  </div>
);

export default LandingPage;
