import type { AppProps } from 'next/app'
import { useEffect, useState, useRef } from 'react'
import '../styles/globals.css'
import { GeistProvider, CssBaseline, Link, Divider, Page, Text, Toggle, Spacer, Breadcrumbs, Button, Drawer, Tooltip } from '@geist-ui/core'


const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState('light')

  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />
      <Component {...pageProps} setTheme={setTheme} />
    </GeistProvider>
  )
}

export default App