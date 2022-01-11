import { ADLs, ICheckIn, IRecordState, toDayString } from '../api/data'
import ADL from './adl'

const Day = ({date, record, handler}: {date: string, record: ICheckIn, handler: Function}): JSX.Element => {
    if (!date) return <></>
    const timeline = parseInt(date.replaceAll("-","")) - parseInt(toDayString(new Date()).replaceAll("-",""))
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