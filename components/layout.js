import Head from 'next/head'
import Header from './header'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>AOD Movies</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}