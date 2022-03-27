import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import { GeistProvider, CssBaseline, Link, Divider, Page, Text, Toggle, Spacer, Breadcrumbs, Button } from '@geist-ui/core'
import { Sun, Moon, Code, Mail, Pin } from '@geist-ui/icons'
import { useMediaQuery } from 'react-responsive'
import { useDarkMode } from 'usehooks-ts'
import Head from 'next/head'

const App = ({ Component, pageProps, router }: AppProps) => {
  const [theme, setTheme] = useState('light')

  const toggle = () => {
    let newTheme = theme === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    localTheme
      ? setTheme(localTheme)
      : window.localStorage.setItem(
        'theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      )
  }, [])

  const isBig = useMediaQuery({
    query: '(min-width: 720px)'
  })

  let crumbStack = ''

  return (
    <GeistProvider themeType={theme}>
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
            {isBig &&
              <div id='theme-toggle' onClick={toggle}>
                {theme == 'dark' ? <Sun color='yellow' /> : <Moon color='blue' />}
              </div>
            }
          </div>
        </Page.Header>
        <Divider />
        <Component {...pageProps} />
        <Spacer />
        <Page.Footer id='footer'>
          <Divider />
          <Text id='masthead' style={{ textAlign: 'center' }}>created with 💙&nbsp; & ☕&nbsp; by smrth</Text>
        </Page.Footer>
      </Page>
    </GeistProvider>
  )
}

export default App