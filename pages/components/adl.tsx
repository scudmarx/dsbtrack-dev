
const ADL = ({adl, achieved = false, handler = () => {}, index}: {adl: any, achieved: boolean, handler: Function, index: number}): JSX.Element => {
    const handleClick = ((event: any) => {
        handler(!achieved)
    })
    return (
    <div key={adl.label} className={`adl ${achieved ? "achieved" : ""} ${(["death", "shaft", "bombs"])[Math.floor(index / 5)]}`} onClick={handleClick}>
        <span>{adl.label}</span> <input type="checkbox" readOnly checked={achieved} />
    </div>)
}
export default ADL