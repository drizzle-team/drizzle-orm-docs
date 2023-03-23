import neon from './neon-serverless.svg';
import postgresjslight from './postgres-js-light.svg';
import postgresjsdark from './postgres-js-dark.svg';

const images: {
  [key: string]: {
    src: string;
  }
} = {
  'neon-serverless': neon,
  'postgres-js-dark': postgresjsdark,
  'postgres-js-light': postgresjslight,
};

export default images;
