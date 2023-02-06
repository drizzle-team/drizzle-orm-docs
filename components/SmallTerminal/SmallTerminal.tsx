import { useRef, useEffect } from 'react';

import TerminalObject, { Options } from '../../utils/trmnl/index';

interface Props {
  data: any,
  height?: string
}

const SmallTerminal: React.FC<Props> = ({ data, height }) => {
  let terminal1: TerminalObject;

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
      terminal1 = new TerminalObject(
        terminalRef.current,
        data,
        schemaOptions,
      );
      terminal1.render();
    }
    return (() => {
      terminal1.clearTimeout();
    });
  }, []);

  return (
    <div style={{ marginTop: '1.5rem' }} ref={terminalRef} />
  );
};

export default SmallTerminal;
