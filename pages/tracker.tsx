import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState, WheelEventHandler } from 'react'
import { IRecordState, loadData, newCheckIn, saveData, toDayString } from '../api/data'
import Day from '../components/day'

const Tracker: NextPage = () => {
  
  const [record, setrecord]: [IRecordState, (state: IRecordState) => void] = useState({} as IRecordState)
  const [columns, setColumns] = useState(7)
  const [dateOffset, setDateOffset] = useState(0)

  const today = new Date(new Date().setHours(0, 0, 0, 0))
  
  const days = [1,2,3,4,5,6,7].map(d => toDayString(new Date(today.valueOf() + (d + dateOffset -  7) * 1000 * 60 * 60 * 24)));

  const mouseWheel = (e: WheelEvent): void => {
    if (e.shiftKey) {
      if (e.deltaY > 0) dayUp();
      else dayDown();
    }
  }
  const dayUp = () => {
    setDateOffset(dateOffset + 1)
  }
  const dayDown = () => {
    setDateOffset(dateOffset - 1)
  }

  const handler = (date: string) => (adl: string) => (achieved: boolean) => {
    let newrecord = {...record}
    if (!newrecord[date]) newrecord[date] = newCheckIn();
    if (!achieved) {
      if (newrecord[date].adls.includes(adl)) {
        newrecord[date].adls.splice(newrecord[date].adls.indexOf(adl), 1)
      }
    } else {
      if (!newrecord[date].adls.includes(adl)) {
        newrecord[date].adls.push(adl)
      }
    }
    setrecord(newrecord)
    saveData(newrecord);
  }

  const calcCols = (): void => {
    setColumns(Math.min(7, Math.floor(Math.min(screen.availWidth, innerWidth) / 200)))
  }
  useEffect(() => {
    window.onresize = calcCols;
    calcCols();
    setrecord(loadData());
  }, [])
  
  const firstcolumn = 7 - columns
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

        <div style={{margin: "0px auto", textAlign: "center"}}>
        <div className={`navButton`} onClick={dayDown}>{"<"}</div>
          <div id="tracker" className="calendar" onWheel={mouseWheel as any as WheelEventHandler<HTMLDivElement>}>
            {displayedDays.map((d,i) => 
              <Day key={i} date={d} record={record[d]} handler={handler(d)} />
            )}
          </div>
          <div className={`navButton`} onClick={dayUp}>{">"}</div>
        </div>
      </main>
    </div>
  )
}

export default Tracker
