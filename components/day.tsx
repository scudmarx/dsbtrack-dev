import { ADLs, ICheckIn, IRecordState, toDayString } from '../api/data'
import ADL from './adl'

const Day = ({date, record, handler}: {date: string, record: ICheckIn, handler: Function}): JSX.Element => {
    const timeline = parseInt(date.replace(/-/g,"")) - parseInt(toDayString(new Date()).replace(/-/g,""))
    var day_component = (
    <div key={date} className={`day ${timeline > 0 ? "future" : timeline < 0 ? "past" : "today"}`}>
        <div className={`dayhead`}>
            {date}
        </div>
        {ADLs.map((adl, i) => <ADL 
            index={i}
            key={i}
            adl={adl} 
            achieved={!!(record && record.adls.includes(adl.label))} 
            handler={handler(adl.label)}
        />)}
    </div>
    )

    return day_component
}

export default Day