import React from 'react';
import styles from './LandingPage.module.css';
import Example from '../../Example/Example';
import mdxstyles from '../../../assets/styles/mdx-styles.module.css';
import install from '../../../utils/install.json';
import commands1 from '../../../utils/commands-1.json';
import commands2 from '../../../utils/commands-2.json';
import cliOption from '../../../utils/cli-option.json';
import confFile from '../../../utils/conf-file.json';
import introspect from '../../../utils/introspect.json';
import generateSchema from '../../../utils/generate-schema.json';
import updateStale from '../../../utils/updateStale.json';
import updateStaleExample from '../../../utils/update-stale-example.json';
import migrationCheck from '../../../utils/migration-check.json';
import migrationCheckExample from '../../../utils/migration-check-example.json';
import SmallTerminal from '../../SmallTerminal/SmallTerminal';

const LandingPage = () => (
  <div className={styles.wrap}>
    <div className={styles.header}>
      <b>DrizzleKit</b>
      {' '}
      - is a CLI migrator tool for DrizzleORM. It is probably one and
      only tool that lets you completely automatically
      generate SQL migrations and covers ~95% of the common cases
      like delitions and renames by prompting user input.
    </div>
    <h2 className={mdxstyles.h2}>How it works?</h2>
    <Example />
    <h2 className={mdxstyles.h2}>Installation & configuration</h2>
    <SmallTerminal data={install} height="16px" />
    <p className={mdxstyles.p}>Running with CLI options</p>
    <SmallTerminal data={cliOption} height="16px" />
    <p className={mdxstyles.p}>Or put your file to `drizzle.config.json` configuration file:</p>
    <SmallTerminal data={confFile} height="64px" />
    <h2 className={mdxstyles.h2}>List of commands</h2>
    <p className={mdxstyles.p}>Generate SQL migrations based on current .ts schema\</p>
    <SmallTerminal data={commands1} height="80px" />
    <p className={mdxstyles.p}>
      <code className={mdxstyles.code}>--config</code>
      {' '}
      [optional defalut=drizzle.config.json] config file path
      <br />
      <code className={mdxstyles.code}>--schema</code>
      {' '}
      path to typescript schema file or folder with multiple schema files
      <br />
      <code className={mdxstyles.code}>--out</code>
      {' '}
      [optional default=drizzle/] migrations folder
    </p>
    <SmallTerminal data={commands2} height="176px" />
    <p className={mdxstyles.p}>Introspect existing database and generate typescript schema</p>
    <SmallTerminal data={introspect} height="16px" />
    <SmallTerminal data={generateSchema} height="48px" />
    <p className={mdxstyles.p}>Update stale snapshots</p>
    <SmallTerminal data={updateStale} height="80px" />
    <p className={mdxstyles.p}>
      <code className={mdxstyles.code}>--out</code>
      {' '}
      [optional] migrations folder
      <br />
      <code className={mdxstyles.code}>--config</code>
      {' '}
      [optional defalut=drizzle.config.json] config file path
    </p>
    <SmallTerminal data={updateStaleExample} height="64px" />
    <p className={mdxstyles.p}>Migrations collisions check</p>
    <SmallTerminal data={migrationCheck} height="80px" />
    <p className={mdxstyles.p}>
      <code className={mdxstyles.code}>--out</code>
      {' '}
      [optional] migration folder
      <br />
      <code className={mdxstyles.code}>--config</code>
      [optional defalut=drizzle.config.json] config file path
    </p>
    <SmallTerminal data={migrationCheckExample} height="64px" />
  </div>
);

export default LandingPage;
