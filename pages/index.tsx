import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const router = useRouter()
  const goTracker = () => {router.push("/tracker")}
  useEffect(() => {
    (document.getElementsByClassName(styles.title)[0] as HTMLElement).style.transition = "visibility 0s 1s, opacity 1s linear"
    setTimeout(() => {
      let title = (document.getElementsByClassName(styles.title)[0] as HTMLElement)
      if (title) {
        title.style.visibility = "hidden";
        title.style.opacity = "0";}
      }, 1500);
    setTimeout(goTracker, 3500)
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>ADL-Tracker</title>
        <meta name="description" content="Track your ADLs." />
        <meta name="theme-color" content="#4A90E2"/>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title} onClick={goTracker}>
          ADL Tracker
        </h1>
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          For <a href="https://twitch.tv/JaneTheMessage/">Jane</a> by Scudmarx
        </span>
      </footer>
    </div>
  )
}

export default Home
