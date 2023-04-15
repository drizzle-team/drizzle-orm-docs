import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
import 'monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css';

import './style.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}