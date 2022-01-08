import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { toDayString } from './api/data'
import Day from './components/day'
//import styles from '../styles/Tracker.module.css'
//import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

const Tracker: NextPage = () => {

  const [columns, setColumns] = useState(7)
  const [dateOffset, setDateOffset] = useState(0)

  const showWeeks = false;
  const today = new Date(new Date().setHours(0, 0, 0, 0))
  
  const days = [1,2,3,4,5,6,7].map(d => toDayString(new Date(today.valueOf() + (d + dateOffset - (showWeeks ? today.getDay() : 7)) * 1000 * 60 * 60 * 24)));

  const mouseWheel = (e: WheelEvent) => {
    moveDate((e.deltaY > 0 ? -1 : 1))
  }

  const moveDate = (move: number) => {
    setDateOffset(dateOffset + move)
  }

  const calcCols = (): void => {
    setColumns(Math.min(7, Math.floor(innerWidth / 200)))
  }
  useEffect(() => {
    window.onresize = calcCols; calcCols();
    document.getElementById("tracker")?.addEventListener("wheel", mouseWheel);
  }, [])
  
  const firstcolumn = Math.max(0, days.indexOf(toDayString(today)) + dateOffset - columns + 1)
  const displayedDays = days.slice(firstcolumn, firstcolumn + columns)

  return (
    <div className="container">
      <Head>
        <title>DSB-Tracker</title>
        <meta name="description" content="Track your DSB achievements." />
        <link rel="icon" href="/favicon.ico" />
        {/*link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>*/}
      </Head>

      <div className="progress">
        <div className="progress-bar" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
      </div>


      <main className="main">
        <h1 className="title">
          DSB Tracker
        </h1>

        <div id="tracker" className="calendar">
          {displayedDays.map((d,i) => 
            <Day date={d} />)}
        </div>
      </main>
    </div>
  )
}

export default Tracker
