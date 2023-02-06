import { useEffect, useRef, useState } from 'react';

import styles from './Example.module.css';
import generateExample from '../../utils/generate-example.json';
import Terminal from '../../utils/trmnl';
import mdxstyles from '../../assets/styles/mdx-styles.module.css';
import CodeBlock from '../CodeBlock/CodeBlock';

const exampleCode = [`import { integer, pgTable, serial, text, varchar } from "drizzle-orm-pg";

const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 256 }),
  }, (table) => ({
    nameIdx: index("name_idx", table.fullName),
  })
);

export const authOtp = pgTable("auth_otp", {
  id: serial("id").primaryKey(),
  phone: varchar("phone", { length: 256 }),
  userId: integer("user_id").references(() => users.id),
});`,
`CREATE TABLE IF NOT EXISTS auth_otp (
	"id" SERIAL PRIMARY KEY,
	"phone" character varying(256),
	"user_id" INT
);

CREATE TABLE IF NOT EXISTS users (
	"id" SERIAL PRIMARY KEY,
	"full_name" character varying(256)
);

DO $$ BEGIN
 ALTER TABLE auth_otp ADD CONSTRAINT auth_otp_user_id_fkey FOREIGN KEY ("user_id") REFERENCES users(id);
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS users_full_name_index ON users (full_name);`];

const Example = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs, setTabs] = useState<string[]>(['schema.ts']);
  const terminalRef = useRef(null!);
  let terminal: Terminal;
  useEffect(() => {
    if (terminalRef.current) {
      terminal = new Terminal(terminalRef.current, generateExample, {
        typingSpeed: 100,
        width: '100%',
        disableButtons: true,
        height: '188px',
        font: 'Menlo',
        borderRadius: '0',
      });
      terminal.render();
      terminal.start(() => {
        setTimeout(() => {
          setTabs((prev) => [...prev, 'sql']);
          setActiveTab(1);
        }, 2000);
      });
    }
    return () => {
      terminal.clearTimeout();
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <code className={mdxstyles.code}>drizzle-kit</code>
          {' '}
          will traverse
          {' '}
          <code className={mdxstyles.code}>schema folder</code>
          {' '}
          or
          {' '}
          <code className={mdxstyles.code}>schema file</code>
          ,
          generate schema snapshot and compare it to the previous version(if there&apos;s one).
          Based on the difference it will generate all needed SQL migrations
          and if there&apos;re any
          {' '}
          <code className={mdxstyles.code}>automatically unresolvable</code>
          {' '}
          cases like
          {' '}
          <code className={mdxstyles.code}>renames</code>
          {' '}
          it will prompt user for input.
        </div>
        <div className={styles.right}>
          <div className={styles.tabs}>
            {tabs.map((tab, key) => (
              <div className={`${styles.tab} ${activeTab === key ? [styles.tab_active] : ''}`} key={key} onClick={() => { setActiveTab(key); }}>
                {tab}
              </div>
            ))}
          </div>
          <div className={styles.content}>
            <CodeBlock code={exampleCode[activeTab]} />
            <div ref={terminalRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
