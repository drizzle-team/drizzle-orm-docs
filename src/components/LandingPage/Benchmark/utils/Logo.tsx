import { type FC } from "react";
import DrizzleLogo from "@/assets/icons/DrizzleLogo";
import PrismaIcon from "@/assets/icons/PrismaIcon";

interface Props {
  logo: string;
}

const Logo: FC<Props> = ({ logo }) => {
  if (logo === "drizzle") {
    return <DrizzleLogo />;
  }
  if (logo === "prisma") {
    return <PrismaIcon />;
  }
  return null;
};

export default Logo;
