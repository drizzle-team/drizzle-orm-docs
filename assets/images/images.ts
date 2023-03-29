import neon from './neon-serverless.svg';
import postgresjslight from './postgres-js-light.svg';
import postgresjsdark from './postgres-js-dark.svg';
import dbdark from "./database-dark.svg"
import dblight from "./database-light.svg"
import serverlight from "./server-light.svg"
import serverdark from "./server-dark.svg"

const images: {
  [key: string]: {
    src: string;
  }
} = {
  'neon-serverless': neon,
  'postgres-js-dark': postgresjsdark,
  'postgres-js-light': postgresjslight,
  'database-light': dblight,
  'database-dark': dbdark,
  'server-dark': serverdark,
  'server-light': serverlight,
};

export default images;
