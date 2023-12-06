import React, { FC } from 'react';
import DrizzleLogo from '@/components/Icons/DrizzleLogo';
import PrismaIcon from '@/components/Icons/PrismaIcon';

interface Props {
  logo: string;
}

const Logo:FC<Props> = ({ logo }) => {
  if (logo === 'drizzle') {
    return <DrizzleLogo />;
  }
  if (logo === 'prisma') {
    return <PrismaIcon />;
  }
  return null;
};

export default Logo;
