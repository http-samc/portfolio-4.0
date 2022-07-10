import { useEffect, useState, useRef } from 'react'
import { GeistProvider, CssBaseline, Link, Divider, Page, Text, Toggle, Spacer, Breadcrumbs, Button, Drawer, Tooltip, useTheme } from '@geist-ui/core'
import { Sun, Moon, Mail, Pin, Terminal, Menu } from '@geist-ui/icons'
import Head from 'next/head'
import { BiTestTube } from 'react-icons/bi'
import { BounceLoader } from 'react-spinners'
import { useMediaQuery } from 'usehooks-ts'
// @ts-ignore
import TypeAnimation from 'react-type-animation';
import Script from 'next/script'
import Particles from '../components/particles'
import { useRouter } from 'next/router'

const ADJECTIVES = ['built', 2000, 'forged', 2000, 'developed', 2000, 'created', 2000, 'envisioned', 2000, 'researched', 2000, 'implemented', 2000, 'programmed', 2000, 'designed', 2000, 'constructed', 2000, 'maintained', 2000, 'optimized', 2000, 'tailored', 2000,]

const PageLayout = ({ children, setTheme }: any) => {
  const router = useRouter();
  const theme = useTheme();
  const [loading, setLoading] = useState(true)
  const [darwerIsVisible, setDrawerisVisisble] = useState(false)
  const isBig = useMediaQuery('(min-width: 600px)')
  const isMedium = useMediaQuery('(min-width: 450px)')

  const toggleTheme = () => {
    let newTheme = theme.type === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  const toggleDrawer = () => {
    setDrawerisVisisble(!darwerIsVisible)
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    if (localTheme)
      setTheme(localTheme)
    else {
      window.localStorage.setItem(
        'theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      )
    }
    const lastVisit = parseInt(window.localStorage.getItem('lastVisit') || '0')

    if (!!lastVisit && lastVisit > Date.now() - 1000 * 60 * 60 * 24 * 2)
      setLoading(false)
    else {
      window.localStorage.setItem('lastVisit', Date.now().toString())
      setTimeout(() => setLoading(false), 1000)
    }
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: theme.type == 'light' ? 'white' : 'black'
      }}>
        <BounceLoader loading={loading} color='navy' />
      </div>
    )
  }
  return (
    <>
      {theme.type == 'dark' && <Particles />}
      <Head>
        <title>
          {
            router.pathname.length > 1
              ? router.pathname.slice(1).split('/')[0] + ' @ '
              : ''
          }
          smrth.dev
        </title>
        <meta name="title" content="smrth.dev" />
        <meta name="description" content="Sam Chitgopekar's official developer portfolio and blog." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content="smrth.dev" />
        <meta property="og:description" content="Sam Chitgopekar's official developer portfolio and blog." />
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/67826352?s=500" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:url" content={window.location.href} />
        <meta property="twitter:title" content="smrth.dev" />
        <meta property="twitter:description" content="Sam Chitgopekar's official developer portfolio and blog." />
        <meta property="twitter:image" content="https://avatars.githubusercontent.com/u/67826352?s=500" />
      </Head>
      <Page id="page" dotBackdrop={true} dotSize="2px" style={{ padding: 20, marginTop: -30 }}>
        <div className='header-wrapper'>
          <Page.Header className='header-container header'>
            <div className='header-container' id="big-logo-container">
              <Link href='/'>
                <Text h2 type="success">smrth.dev</Text>
              </Link>
              {isMedium &&
                <Breadcrumbs>
                  {
                    router.pathname === '/'
                      ? null
                      : router.pathname.split('/').map((crumb, i) => {
                        if (crumb[0] == '[')
                          return
                        return (
                          <Breadcrumbs.Item href={crumb} key={i}>{crumb}</Breadcrumbs.Item>
                        )
                      })
                  }
                </Breadcrumbs>
              }
            </div>
            <div className='header-container' id="nav-container" style={{ flexDirection: isBig ? 'row' : 'row-reverse' }}>
              {isBig &&
                <div>
                  <Tooltip text='Contact' placement='bottom' type='success'>
                    <Link href="mailto:chitgopekarsamarth@gmail.com"><Mail /></Link>
                  </Tooltip>
                  <Spacer inline w={1} />
                  <Tooltip text='Projects' placement='bottom' type='success'>
                    <Link href="/projects"><Terminal /></Link>
                  </Tooltip>
                  <Spacer inline w={1} />
                  <Tooltip text='Blog' placement='bottom' type='success'>
                    <Link href="/blog"><Pin /></Link>
                  </Tooltip>
                  <Spacer inline w={1} />
                  <Tooltip text='Research' placement='bottom' type='success'>
                    <Link href="/research"><BiTestTube size={21} style={{ marginLeft: 3 }} color={theme.type == 'light' ? 'black' : 'white'} /></Link>
                  </Tooltip>
                </div>
              }
              {
                !isBig &&
                <div>
                  <Button
                    icon={<Menu />}
                    className='header-button'
                    onClick={toggleDrawer}
                    paddingRight={0.5}
                    paddingLeft={0.5}
                    auto
                  />
                  <Drawer visible={darwerIsVisible} onClose={() => setDrawerisVisisble(false)}>
                    <div className='header-container-drawer'>
                      <Link className='drawer-link' href="mailto:chitgopekarsamarth@gmail.com">
                        <Mail />
                        <Spacer w={0.5} />
                        <Text>contact</Text>
                      </Link>
                      <Link className='drawer-link' href="/projects">
                        <Terminal />
                        <Spacer w={0.5} />
                        <Text>projects</Text>
                      </Link>
                      <Link className='drawer-link' href="/blog">
                        <Pin />
                        <Spacer w={0.5} />
                        <Text>blog</Text>
                      </Link>
                      <Link className='drawer-link' href="/research">
                        <BiTestTube size={21} color={theme.type == 'light' ? 'black' : 'white'} />
                        <Spacer w={0.5} />
                        <Text>research</Text>
                      </Link>
                      <Spacer h={10} />
                    </div>
                  </Drawer>
                </div>
              }
              <Spacer w={isBig ? 1.5 : 0.5} />
              <Button
                onClick={toggleTheme}
                className='header-button'
                icon={theme.type == 'dark' ? <Sun color='white' /> : <Moon color='black' />}
                paddingRight={0.5}
                paddingLeft={0.5}
                mb={isBig ? 0.25 : 0}
                auto
                ghost
              />
            </div>
          </Page.Header>
        </div>
        <div id="content">
          {children}
        </div>
        <Spacer />
        <Page.Footer id='footer'>
          <Divider />
          <Text id='masthead' style={{ textAlign: 'center' }}>
            <TypeAnimation
              cursor={true}
              sequence={ADJECTIVES}
              wrapper="span"
              repeat={Infinity}
            />
            with 💙&nbsp; & ☕&nbsp; by smrth
          </Text>
        </Page.Footer>
      </Page >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-BDJ8RBFCND"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-BDJ8RBFCND');
        `}
      </Script>
    </ >
  )
}

export default PageLayout