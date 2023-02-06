import './style.css'
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}