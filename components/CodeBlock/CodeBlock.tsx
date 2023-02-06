import React, { useEffect, useRef } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import SimpleBar from 'simplebar';
import CopyButton from '../CopyButton/CopyButton';
import styles from './CodeBlock.module.css';

interface Props {
  code: string;
}

const CodeBlock:React.FC<Props> = ({ code }) => {
  const scrollableRef = useRef<HTMLDivElement>(null!);
  const scriptRef = useRef<HTMLPreElement>(null!);
  useEffect(() => {
    if (scrollableRef.current) {
      // eslint-disable-next-line no-new
      new SimpleBar(scrollableRef.current);
    }
  }, []);

  const getText = () => {
    if (scriptRef.current) {
      navigator.clipboard.writeText(scriptRef.current.innerText);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.fade_border} />
      <Highlight {...defaultProps} theme={theme} code={code} language="sql">
        {({
          className, style, tokens, getLineProps, getTokenProps,
        }) => (
          <div className={styles['pre-wrap']} ref={scrollableRef}>
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
