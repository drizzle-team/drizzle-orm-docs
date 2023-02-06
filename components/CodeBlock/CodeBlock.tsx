import React, { useRef } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import CopyButton from '../CopyButton/CopyButton';
import styles from './CodeBlock.module.css';
import code from './code';

const CodeBlock = () => {
  const scriptRef = useRef<HTMLPreElement>(null!);
  const getText = () => {
    if (scriptRef.current) {
      navigator.clipboard.writeText(scriptRef.current.innerText);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.fade_border} />
      <Highlight {...defaultProps} theme={theme} code={code} language="typescript">
        {({
          className, style, tokens, getLineProps, getTokenProps,
        }) => (
          <div className={styles['pre-wrap']}>
            <pre ref={scriptRef} className={`${className} ${styles.pre}`} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
      <CopyButton onClick={getText} />
    </div>
  );
};

export default CodeBlock;
