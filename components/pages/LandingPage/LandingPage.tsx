import React from 'react';
import styles from './LandingPage.module.css';
import mdxstyles from '../../../assets/styles/mdx-styles.module.css';
import installation from '../../../scripts/installation.json';
import SmallTerminal from '../../SmallTerminal/SmallTerminal';
import CodeBlock from '../../CodeBlock/CodeBlock';

const LandingPage = () => (
  <div className={styles.wrap}>
    <div className={styles.header}>
      <p className={mdxstyles.p}>
        <b>Drizzle ORM</b>
        {' '}
        is a TypeScript ORM for SQL databases designed with maximum type safety in mind.
        It comes with a
        {' '}
        <a href="https://github.com/drizzle-team/drizzle-kit-mirror" className={mdxstyles.a}>drizzle-kit</a>
        {' '}
        CLI companion for automatic SQL migrations generation.
        Drizzle ORM is meant to be a library, not a framework.
        It stays as an opt-in solution all the time at any levels.
      </p>
      <p className={mdxstyles.p}>
        The ORM main philosophy is &quot;If you know SQL, you know Drizzle ORM&quot;.
        We follow the SQL-like syntax whenever possible,
        are strongly typed ground top and fail at compile time, not in runtime.
      </p>
      <p className={mdxstyles.p}>
        Drizzle ORM is being battle-tested on production projects by multiple teams 🚀
        Give it a try and let us know if you have any questions or feedback on
        {' '}
        <a className={mdxstyles.a} href="https://discord.gg/yfjTbVXMW4">Discord</a>
        .
      </p>
    </div>
    <h2 className={mdxstyles.h2}>Feature list</h2>
    <ul className={mdxstyles.ul}>
      <li className={mdxstyles.li}>Full type safety</li>
      <li className={mdxstyles.li}>
        <a className={mdxstyles.a} href="https://github.com/drizzle-team/drizzle-kit-mirror">Smart automated migrations generation</a>
      </li>
      <li className={mdxstyles.li}>No ORM learning curve</li>
      <li className={mdxstyles.li}>SQL-like syntax for table definitions and queries</li>
      <li className={mdxstyles.li}>Best in class fully typed joins</li>
      <li className={mdxstyles.li}>
        Fully typed partial and non-partial selects of any complexity
      </li>
      <li className={mdxstyles.li}>
        Auto-inferring of TS types for DB models for selections and insertions separately
      </li>
      <li className={mdxstyles.li}>Zero dependencies</li>
    </ul>
    <h2 className={mdxstyles.h2}>Supported databases</h2>
    <table className={mdxstyles.table}>
      <thead className={mdxstyles.thead}>
        <tr className={mdxstyles.tr}>
          <th className={mdxstyles.th} align="left">Database</th>
          <th className={mdxstyles.th} align="center">Status</th>
          <th className={mdxstyles.th} align="left"> </th>
        </tr>
      </thead>
      <tbody className={mdxstyles.tbody}>
        <tr className={mdxstyles.tr}>
          <td className={mdxstyles.td} align="left">PostgreSQL</td>
          <td className={mdxstyles.td} align="center">✅</td>
          <td className={mdxstyles.td} align="left"><a className={mdxstyles.a} href="/drizzle-orm/src/pg-core/README.md">Docs</a></td>
        </tr>
        <tr className={mdxstyles.tr}>
          <td className={mdxstyles.td} align="left">MySQL</td>
          <td className={mdxstyles.td} align="center">✅</td>
          <td className={mdxstyles.td} align="left"><a className={mdxstyles.a} href="/drizzle-orm/src/mysql-core/README.md">Docs</a></td>
        </tr>
        <tr className={mdxstyles.tr}>
          <td className={mdxstyles.td} align="left">SQLite</td>
          <td className={mdxstyles.td} align="center">✅</td>
          <td className={mdxstyles.td} align="left"><a className={mdxstyles.a} href="/drizzle-orm/src/sqlite-core/README.md">Docs</a></td>
        </tr>
        <tr className={mdxstyles.tr}>
          <td className={mdxstyles.td} align="left">DynamoDB</td>
          <td className={mdxstyles.td} align="center">⏳</td>
          <td className={mdxstyles.td} align="left" />
        </tr>
        <tr className={mdxstyles.tr}>
          <td className={mdxstyles.td} align="left">MS SQL</td>
          <td className={mdxstyles.td} align="center">⏳</td>
          <td className={mdxstyles.td} align="left" />
        </tr>
        <tr className={mdxstyles.tr}>
          <td className={mdxstyles.td} align="left">CockroachDB</td>
          <td className={mdxstyles.td} align="center">⏳</td>
          <td className={mdxstyles.td} align="left" />
        </tr>
      </tbody>
    </table>
    <h2 className={mdxstyles.h2}>Installation</h2>
    <SmallTerminal data={installation} height="32px" />
    <h2 className={mdxstyles.h2}>Feature showcase (PostgreSQL)</h2>
    <blockquote className={mdxstyles.blockquote}>
      <p className={mdxstyles.p}>
        <strong>Note</strong>
        : don&apos;t forget to install
        {' '}
        <code className={mdxstyles.code}>pg</code>
        {' '}
        and
        {' '}
        <code className={mdxstyles.code}>@types/pg</code>
        {' '}
        packages for this example to work.
      </p>
    </blockquote>
    <CodeBlock />
    <p className={mdxstyles.p}>
      <strong>See full docs for further reference:</strong>
    </p>
    <ul className={mdxstyles.ul}>
      <li className={mdxstyles.li}>
        <a className={mdxstyles.a} href="https://github.com/drizzle-team/drizzle-kit-mirror">PostgreSQL</a>
      </li>
      <li className={mdxstyles.li}>
        <a className={mdxstyles.a} href="https://github.com/drizzle-team/drizzle-kit-mirror">MySQL</a>
      </li>
      <li className={mdxstyles.li}>
        <a className={mdxstyles.a} href="https://github.com/drizzle-team/drizzle-kit-mirror">SQLite</a>
      </li>
    </ul>
  </div>
);

export default LandingPage;
