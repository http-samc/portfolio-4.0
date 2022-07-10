import type { AppProps } from 'next/app'
import '../styles/globals.css'
import PageLayout from '../layout/page'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default App