import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import { GeistProvider, CssBaseline, Link, Divider, Page, Text, Toggle, Spacer, Breadcrumbs, Button } from '@geist-ui/core'
import { Sun, Moon, Mail, Pin, Terminal } from '@geist-ui/icons'
import Head from 'next/head'
import { BiTestTube } from 'react-icons/bi'
import { css } from '@emotion/react'
import { BounceLoader } from 'react-spinners'

const App = ({ Component, pageProps, router }: AppProps) => {
  const [theme, setTheme] = useState('light')
  const [loading, setLoading] = useState(true)

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
    setTimeout(() => setLoading(false), 1000)
  }, [])

  let crumbStack = ''

  if (loading)
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
        <BounceLoader loading={loading} color='navy' />
      </div>
    )

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
            {
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
            <Link href="/projects"><Terminal /></Link>
            <Spacer inline w={1} />
            <Link href="/blog"><Pin /></Link>
            <Spacer inline w={1} />
            <Link href="/research"><BiTestTube size={21} style={{ marginLeft: 3 }} color={theme == 'light' ? 'black' : 'white'} /></Link>
            {
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
          <Text id='masthead' style={{ textAlign: 'center' }}>forged with 💙&nbsp; & ☕&nbsp; by smrth</Text>
        </Page.Footer>
      </Page>
    </GeistProvider>
  )
}

export default App