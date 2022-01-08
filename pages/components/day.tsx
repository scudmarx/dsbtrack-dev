import { useState } from 'react'
import { ADLs, toDayString } from '../api/data'
import ADL from './adl'

const Day = ({date}: {date: string}): JSX.Element => {
    const [record, setrecord]: [any, any] = useState({})
    const isToday = date==toDayString(new Date())
    //const dayString = date.toISOString().slice(0,10)

    var day_component = (
    <div key={date} className={`day ${isToday ? "today" : ""}`}>
        <div className={`dayhead ${isToday ? "today" : ""}`}>
            {date}
        </div>
        {ADLs.map(adl => <ADL 
            adl={adl} 
            achieved={!!(record[date] && record[date][adl.label])} 
            toggle={(achieved: boolean) => {
                console.log(`${date}: ${adl.label} ${achieved ? "achieved!" : "not achieved."}`)
                setrecord({...record, [date]: {...record[date], [adl.label]: achieved}})
            }}
        />)}
    </div>
    )

    return day_component
}

export default Day