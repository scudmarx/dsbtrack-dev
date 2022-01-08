import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const router = useRouter()
  const goTracker = () => {router.push("/tracker")}
  
  return (
    <div className={styles.container}>
      <Head>
        <title>DSB-Tracker</title>
        <meta name="description" content="Track your DSB achievements." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title} onClick={goTracker}>
          DSB Tracker
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
