import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState, WheelEventHandler } from 'react'
import { ADLs, IConfigState, IRecordState, loadConfig, loadData, newCheckIn, saveConfig, saveData, toDayString } from '../api/data'
import { ConfigMenu } from '../components/configmenu'
import Day from '../components/day'

const Tracker: NextPage = () => {
  
  const [config, setConfig] = useState({hiddenADLs: []} as IConfigState)
  const [record, setrecord]: [IRecordState, (state: IRecordState) => void] = useState({} as IRecordState)
  const [columns, setColumns] = useState(7)
  const [dateOffset, setDateOffset] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

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

  const configHandler = (config: IConfigState): void => {
    setConfig(config)
    saveConfig(config);
  }

  const handler = (date: string) => (adl: string) => (achieved: boolean | "partial") => {
    let newrecord = {...record}
    if (!newrecord[date]) newrecord[date] = newCheckIn();
    if (config.use_partials) {
      if (typeof(newrecord[date].partial_adls) == "undefined") newrecord[date].partial_adls = [];
      if (achieved == "partial") {
        if ((newrecord[date].partial_adls as string[]).includes(adl)) {
          (newrecord[date].partial_adls as string[]).splice((newrecord[date].partial_adls as string[]).indexOf(adl), 1)
        }
      }

      if (achieved === true) {
        if (newrecord[date].adls.includes(adl)) {
          newrecord[date].adls.splice(newrecord[date].adls.indexOf(adl), 1);
          (newrecord[date].partial_adls as string[]).push(adl)
        }
      }
      
      if (!achieved) {
        if (!newrecord[date].adls.includes(adl)) {
          newrecord[date].adls.push(adl)
        }
      }
    } else {
      if (achieved) {
        if (newrecord[date].adls.includes(adl)) {
          newrecord[date].adls.splice(newrecord[date].adls.indexOf(adl), 1)
        }
        if (newrecord[date].partial_adls && (newrecord[date].partial_adls as string[]).includes(adl)) {
          (newrecord[date].partial_adls as string[]).splice((newrecord[date].partial_adls as string[]).indexOf(adl), 1)
        }
      } else {
        if (!newrecord[date].adls.includes(adl)) {
          newrecord[date].adls.push(adl)
        }
      }
    }
    
    setrecord(newrecord)
    saveData(newrecord);
  }

  const calcCols = (): void => {
    setColumns(Math.min(7, Math.floor(Math.min(screen.availWidth, innerWidth) / 200)))
  }

  const shownADLs = ADLs.filter(adl => !config.hiddenADLs.includes(adl.key))

  useEffect(() => {
    setrecord(loadData());
    setConfig(loadConfig());
    window.onresize = calcCols;
  }, [])
  useEffect(() => {
    calcCols();
  }, [config])

  const firstcolumn = 7 - columns
  const displayedDays = days.slice(firstcolumn, firstcolumn + columns)

  return (
    <div className="container">
      <Head>
        <title>ADL-Tracker</title>
        <meta name="description" content="Track your ADLs." />
        <meta name="theme-color" content="#4A90E2"/>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>

      <main className="main">
        <h1 className="title">
          ADL Tracker
        </h1>

        <ConfigMenu config={config} handler={configHandler} openHandler={setMenuOpen} open={menuOpen} />

        <div style={{margin: "0px auto", textAlign: "center"}}>
          <div className={`navButton`} onClick={dayDown}>{"<"}</div>
          <div id="tracker" className="calendar" onWheel={mouseWheel as any as WheelEventHandler<HTMLDivElement>}>
            {displayedDays.map((d,i) => 
              <Day key={i} date={d} record={record[d]} handler={handler(d)} config={config} />
            )}
          </div>
          <div className={`navButton`} onClick={dayUp}>{">"}</div>
        </div>
      </main>
    </div>
  )
}

export default Tracker
