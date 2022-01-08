
const ADL = ({adl, achieved = false, handler = () => {}}: {adl: any, achieved: boolean, handler: Function}): JSX.Element => {
    
    const handleClick = ((event: any) => {
        handler(!achieved)
    })
    return (
    <div key={adl.label} className={`adl ${achieved ? "achieved" : ""}`} onClick={handleClick}>
        <span>{adl.label}</span> <input type="checkbox" readOnly checked={achieved} />
    </div>)
}
export default ADL