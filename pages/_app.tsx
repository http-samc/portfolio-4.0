import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import { GeistProvider, CssBaseline, Link, Divider, Page, Text, Toggle, Spacer, Breadcrumbs, Button, GeistUIThemes } from '@geist-ui/core'
import { Sun, Moon, Code, Mail, Pin } from '@geist-ui/icons'
import { useMediaQuery } from 'react-responsive'
import { useDarkMode } from 'usehooks-ts'
import { useTheme } from '@geist-ui/core'
import Head from 'next/head'
import { useLocalStorage } from 'usehooks-ts'

const App = ({ Component, pageProps, router }: AppProps) => {
  const theme = useTheme()
  const [themeType, setThemeType] = useState<string>()
  const themeChangeHandle = (theme: GeistUIThemes) => {
    setThemeType(theme.type == 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    const theme = window.localStorage.getItem('theme')
    if (theme !== 'dark') return
    setThemeType('dark')
  }, [])

  const isBig = useMediaQuery({
    query: '(min-width: 720px)'
  })

  let crumbStack = ''

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Head>
        <title>smrth.dev</title>
        <meta name="title" content="smrth.dev" />
        <meta name="description" content="Sam Chitgopekar's official developer portfolio and blog." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://smrth.dev/${router.pathname}`} />
        <meta property="og:title" content="smrth.dev" />
        <meta property="og:description" content="Sam Chitgopekar's official developer portfolio and blog." />
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/67826352?s=500" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://smrth.dev/${router.pathname}`} />
        <meta property="twitter:title" content="smrth.dev" />
        <meta property="twitter:description" content="Sam Chitgopekar's official developer portfolio and blog." />
        <meta property="twitter:image" content="https://avatars.githubusercontent.com/u/67826352?s=500" />
      </Head>
      <Page id="page" dotBackdrop={true} dotSize="2px">
        <Page.Header className='header-container'>
          <div className='header-container' id="big-logo-container">
            <Link href='/'>
              <Text h2 type="success">smrth.dev</Text>
            </Link>
            {isBig &&
              <Breadcrumbs>
                {
                  router.pathname === '/'
                    ? null
                    : router.pathname.split('/').map((crumb, i) => {
                      crumbStack += crumb + '/'
                      if (crumb[0] == '[')
                        return
                      return (
                        <Breadcrumbs.Item href={crumbStack} key={i}>{crumb}</Breadcrumbs.Item>
                      )
                    })
                }
              </Breadcrumbs>
            }
          </div>
          <div className='header-container'>
            <Link href="mailto:chitgopekarsamarth@gmail.com"><Mail /></Link>
            <Spacer inline w={1} />
            <Link href="/projects"><Code /></Link>
            <Spacer inline w={1} />
            <Link href="/blog"><Pin /></Link>
            <div id='theme-toggle' onClick={themeChangeHandle}>
              {theme.type == 'dark' ? <Sun color='yellow' /> : <Moon color='blue' />}
            </div>
            {/* {isBig &&
              <div id='theme-toggle' onClick={themeChangeHandle('light')}>
                {theme == 'dark' ? <Sun color='yellow' /> : <Moon color='blue' />}
              </div>
            } */}
          </div>
        </Page.Header>
        <Divider />
        <Component {...pageProps} />
        <Page.Footer>
          <Divider />
          <Text style={{ textAlign: 'center' }}>created with 💙&nbsp; & ☕&nbsp; by smrth</Text>
        </Page.Footer>
      </Page>
    </GeistProvider>
  )
}

export default App