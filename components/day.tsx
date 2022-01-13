import { ADLs, ICheckIn, IConfigState, IRecordState, toDayString } from '../api/data'
import ADL from './adl'

const Day = ({date, record, handler, config}: {date: string, record: ICheckIn, handler: Function, config: IConfigState}): JSX.Element => {
    const shownADLs = ADLs.filter(adl => !config.hiddenADLs.includes(adl.key))
    const timeline = parseInt(date.replace(/-/g,"")) - parseInt(toDayString(new Date()).replace(/-/g,""))
    const datetime = new Date(parseInt(date.slice(0,4)), parseInt(date.slice(5,7))-1, parseInt(date.slice(8,10)))
    const daytext = `${(["Sun","Mon","Tue","Wed","Thu","Fri","Sat"])[datetime.getDay()]} ${datetime.toLocaleDateString()}`
    var day_component = (
    <div key={date} className={`day ${timeline > 0 ? "future" : timeline < 0 ? "past" : "today"}`}>
        <div className={`dayhead`}>
            <span className={`dayhead-label`}>{daytext}</span>
        </div>
        {shownADLs.map((adl, i) => <ADL 
            index={i}
            key={i}
            adl={adl} 
            achieved={!!(record && record.adls.includes(adl.key))} 
            handler={handler(adl.key)}
            config={config}
        />)}
    </div>
    )

    return day_component
}

export default Day