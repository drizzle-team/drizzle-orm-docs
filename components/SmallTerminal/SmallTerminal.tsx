import { useRef, useEffect } from 'react';

import TerminalObject, { Options } from '../../utils/trmnl/index';
import CopyButton from '../CopyButton/CopyButton';
import styles from './SmallTerminal.module.css';

interface Props {
  data: any,
  height?: string,
  withoutMargin?: boolean,
}

const SmallTerminal: React.FC<Props> = ({ data, height, withoutMargin }) => {
  let terminal: TerminalObject;

  const terminalRef = useRef<HTMLDivElement>(null)!;

  const schemaOptions: Options = {
    typingSpeed: 10,
    width: '100%',
    font: 'Menlo',
    height: height || 'fit-content',
    color: '#ffffff',
    bgColor: '#06182c',
    disableButtons: true,
    disableScroll: true,
    whenInView: true,
    border: {
      width: '0',
      color: '#ffffff',
    },
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminal = new TerminalObject(
        terminalRef.current,
        data,
        schemaOptions,
      );
      terminal.render();
    }
    return (() => {
      terminal.clearTimeout();
    });
  }, []);

  const copy = () => {
    const textValues = data.data;
    const text = textValues.map((t: any) => {
      let value = '';
      if ('input' in t) {
        value = t.input;
      }
      if ('output' in t) {
        value = t.output;
      }
      if ('frames' in t) {
        value = t.frames[t.frames.length - 1].value;
      }
      return value;
    });
    navigator.clipboard.writeText(text.join('\n'));
  };

  return (
    <div className={styles.wrap}>
      <div style={!withoutMargin ? { marginTop: '1.5rem' } : {}} ref={terminalRef} />
      <CopyButton onClick={copy} />
    </div>
  );
};

export default SmallTerminal;
