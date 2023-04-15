import React, { useEffect, useRef, useState } from 'react';
import Editor, { Monaco, OnMount } from '@monaco-editor/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import vsdark from 'prism-react-renderer/themes/vsDark';
import { format } from 'sql-formatter';
import styles from './SQLPlayground.module.css';
import libCreator from './libCreator';
import { compile } from './compiler';

const SQLPlayground = () => {
  const files: {
    [key: string]: {
      name: string,
      language: string,
      value: {
        [key: string]: string;
      }
    }
  } = {
    'query.ts': {
      name: 'query.ts',
      language: 'typescript',
      value: {
        sqlite: `db
  .select({ id: table.id, name: table.name })
  .from(table)
  .groupBy(table.id);`,
        pg: `db
  .select({ id: table.id, name: table.name })
  .from(table)
  .groupBy(table.id);`,
        mysql: `db
  .select({ id: table.id, name: table.name })
  .from(table)
  .groupBy(table.id);`,
      },
    },
    'table.ts': {
      name: 'table.ts',
      language: 'typescript',
      value: {
        sqlite: `sqliteTable('table', {
  id: integer("id"),
  name: text("name")
})`,
        pg: `pgTable('table', {
  id: integer("id"),
  name: text("name")
})`,
        mysql: `mysqlTable('table', {
  id: int("id"),
  name: text("name")
})`,
      },
    },
  };
  const [fileName, setFileName] = useState<string>('query.ts');
  const [dbtype, setdbtype] = useState('sqlite');
  const file = files[fileName];
  const editorRef = useRef<any>(null);
  const [sql, setSql] = useState<string>('');
  const [monacoObj, setMonacoObj] = useState<Monaco>(null!);
  const [errors, setErrors] = useState<any[]>([]);
  const options = {
    readOnly: false,
    minimap: { enabled: false },
  };

  useEffect(() => {
    const pickLibs = async () => {
      let libs;
      if (monacoObj) {
        switch (dbtype) {
          case 'sqlite':
            libs = await libCreator(dbtype);
            monacoObj.editor.getModels().forEach((m, index) => {
              m.setValue(files[index === 0 ? 'query.ts' : 'table.ts'].value.sqlite);
            });
            monacoObj.languages.typescript.typescriptDefaults.setExtraLibs(libs);
            break;
          case 'mysql':
            libs = await libCreator(dbtype);
            monacoObj.editor.getModels().forEach((m, index) => {
              m.setValue(files[index === 0 ? 'query.ts' : 'table.ts'].value.mysql);
            });
            monacoObj.languages.typescript.typescriptDefaults.setExtraLibs(libs);
            break;
          case 'pg':
            libs = await libCreator(dbtype);
            monacoObj.editor.getModels().forEach((m, index) => {
              m.setValue(files[index === 0 ? 'query.ts' : 'table.ts'].value.pg);
            });
            monacoObj.languages.typescript.typescriptDefaults.setExtraLibs(libs);
            break;
          default:
            libs = await libCreator('sqlite');
            monacoObj.editor.getModels().forEach((m, index) => {
              m.setValue(files[index === 0 ? 'query.ts' : 'table.ts'].value.sqlite);
            });
            monacoObj.languages.typescript.typescriptDefaults.setExtraLibs(libs);
            break;
        }
        compile(files['table.ts'].value[dbtype], dbtype, 'table');
      }
    };
    pickLibs();
  }, [dbtype]);

  const handleEditorDidMount: OnMount = async (
    editor,
    monaco,
  ) => {
    editorRef.current = editor;
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      noLib: true,
    });
    setMonacoObj(monaco);
    const libs = await libCreator(dbtype);
    monaco.languages.typescript.typescriptDefaults.setExtraLibs(libs);

    monaco.editor.onDidChangeMarkers(([uri]) => {
      const markers = monaco.editor.getModelMarkers({ resource: uri });
      setErrors(markers.filter((m) => m.severity === monaco.MarkerSeverity.Error));
    });
    compile(files['table.ts'].value.sqlite, 'sqlite', 'table');
  };

  const showCode = async () => {
    if (errors.length) {
      setSql('Error');
      return;
    }
    const code = monacoObj.editor.getModels()[0].getValue();
    try {
      const query = await compile(code, dbtype, 'query');
      setSql(format(query.query.toSQL().sql, {
        keywordCase: 'upper',
      }));
    } catch (e: any) {
      setSql(e.toString());
    }
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  const compileAndChangePath = () => {
    const code = editorRef.current.getValue();
    try {
      compile(code, dbtype, 'table');
    } catch (e: any) {
      setSql(e.toString());
    }
    setFileName('query.ts');
  };

  return (
    <>
      <select defaultValue={dbtype} onChange={(e) => setdbtype(e.target.value)}>
        <option value="sqlite">SQLite</option>
        <option value="mysql">Mysql</option>
        <option value="pg">Postgres</option>
      </select>
      <div className={styles.wrap}>
        <div className={styles.editor}>
          <div className={styles.editor_buttons}>
            <button className={styles.editor_button} type="button" disabled={fileName === 'query.ts'} onClick={compileAndChangePath}>
              query.ts
            </button>
            <button className={styles.editor_button} type="button" disabled={fileName === 'table.ts'} onClick={() => setFileName('table.ts')}>
              table.ts
            </button>
          </div>
          <Editor
            language="typescript"
            onMount={handleEditorDidMount}
            options={options}
            theme="vs-dark"
            path={file.name}
            defaultLanguage={file.language}
            defaultValue={file.value.sqlite}
          />
        </div>
        <div className={styles.preview}>
          <Highlight {...defaultProps} code={sql} theme={vsdark} language="sql">
            {({
              className, style, tokens, getLineProps, getTokenProps,
            }) => (
              <pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        {fileName === 'query.ts' && <button className={styles.btn} type="button" onClick={showCode}>Compile</button>}
        <button className={styles.btn} type="button" onClick={formatCode}>Format</button>
      </div>
    </>
  );
};

export default SQLPlayground;
