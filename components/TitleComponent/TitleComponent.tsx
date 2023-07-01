import React from 'react';
import ToggleLib from '../common/ToggleLib/ToggleLib';

interface Props {
  title: string;
}

const TitleComponent: React.FC<Props> = ({ title }) => {
  if (title === 'DRIZZLE ORM' || title === 'DRIZZLE KIT' || title === 'DRIZZLE STUDIO') {
    return (
      <ToggleLib title={title} />
    );
  }
  return <>{title}</>;
};

export default TitleComponent;
