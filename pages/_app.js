import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { Progress } from '../components/Progress'
import { useProgressStore } from '../store'
import '../styles/globals.css'

export default function MyApp ( { Component, pageProps } ) {
  const setIsAnimating = useProgressStore( ( state ) => state.setIsAnimating )
  const isAnimating = useProgressStore( ( state ) => state.isAnimating )
  const router = useRouter()
  useEffect( () => {
    const handleStart = () => {
      setIsAnimating( true )
    }
    const handleStop = () => {
      setIsAnimating( false )
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [ router ] )

  return (
    <Layout>
      <Progress isAnimating={isAnimating} />
      <Component {...pageProps} />
    </Layout>
  )
}
