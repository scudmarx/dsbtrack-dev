
const ADL = ({adl, achieved = false, toggle = () => {}}: {adl: any, achieved: boolean, toggle: Function}): JSX.Element => {
    
    const handleClick = ((event: any) => {
        toggle(!achieved)
    })
    return (
    <div key={adl.label} className={`adl ${achieved ? "achieved" : ""}`} onClick={handleClick}>
        <span>{adl.label}</span> <input type="checkbox" readOnly checked={achieved} />
    </div>)
}
export default ADL