import { IConfigState } from "../api/data"
import Image from "next/image"

const ADL = ({adl, achieved = false, handler = () => {}, index, config}: {adl: any, achieved: boolean | "partial", handler: Function, config: IConfigState, index: number}): JSX.Element => {
    const showlabels = false
    const handleClick = ((event: any) => {
        handler(achieved)
    })
    return (
    <div key={adl.key} title={adl.label} className={`adl ${achieved == "partial" ? "partial" : (achieved ? "achieved" : "")} ${adl.group}`} onClick={handleClick}>
        <img alt={adl.label} src={`/adl-icons/${adl.icon}`} title={adl.label} className={`adl-icon`} />
        <span>{showlabels ? adl.label : ""}</span> <input type="checkbox" readOnly={true} checked={!!achieved} />
    </div>)
}
export default ADL
