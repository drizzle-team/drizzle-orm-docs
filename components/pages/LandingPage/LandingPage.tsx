import React from 'react';

import styles from './LandingPage.module.css';

import Header from './LandingComponents/Header/Header';
import Performance from './LandingComponents/Performance/Performance';
import Advantages from './LandingComponents/Advantages/Advantages';
import DocButtonBlock from './LandingComponents/DocButtonBlock/DocButtonBlock';
import Supporting from './LandingComponents/Supporting/Supporting';

const LandingPage = () => {
  const runtimes: string[] = ['Cloudflare Workers', 'Supabase functions', 'Bun', 'Deno', 'Browser', 'ElectronJS', 'Lagon'];
  const databases: string[] = ['Neon', 'PlanetScale', 'Turso', 'Supabase', 'PostgreSQL', 'MySQL', 'SQLite', 'Web SQLite'];
  return (
    <div className={styles.wrap}>
      <Header />
      <Advantages />
      <DocButtonBlock />
      <Supporting title="Deploy on the Edge" description="We support every major runtime out there" items={runtimes} />
      <Supporting title="Connect any database" description="We support all platform-specific, tcp, http and websocket based drivers out there" items={databases} />
      <Performance />
    </div>
  );
};

export default LandingPage;
