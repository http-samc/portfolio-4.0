import type { AppProps } from 'next/app'
import '../styles/globals.css'
import PageLayout from '../layout/page'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App