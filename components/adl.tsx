
const ADL = ({adl, achieved = false, handler = () => {}, index}: {adl: any, achieved: boolean, handler: Function, index: number}): JSX.Element => {
    const showlabels = false
    const handleClick = ((event: any) => {
        handler(!achieved)
    })
    return (
    <div key={adl.key} title={adl.label} className={`adl ${achieved ? "achieved" : ""} ${(["death", "shaft", "bombs"])[Math.floor(index / 5)]}`} onClick={handleClick}>
        <img src={`/adl-icons${adl.icon}`} title={adl.label} className={`adl-icon`} />
        <span>{showlabels ? adl.label : ""}</span> <input type="checkbox" readOnly checked={achieved} />
    </div>)
}
export default ADL