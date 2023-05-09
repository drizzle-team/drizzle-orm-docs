import React from 'react';
import ToggleLib from '../common/ToggleLib/ToggleLib';

interface Props {
  title: string;
}

const TitleComponent: React.FC<Props> = ({ title }) => {
  if (title === 'DRIZZLE ORM' || title === 'DRIZZLE KIT') {
    return (
      <ToggleLib title={title} />
    );
  }
  return <>title</>;
};

export default TitleComponent;
