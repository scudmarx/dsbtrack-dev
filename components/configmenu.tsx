import { ADLs, IConfigState } from "../api/data"

export function ConfigMenu ({config = {hiddenADLs: []}, handler = () => {}, openHandler = () => {}, open = true}: {config: IConfigState, handler: Function, openHandler: Function, open: boolean}): JSX.Element {
    const handleClick = (adl: string) => {
        const newConfig = {
            ...config
        }
        if (newConfig.hiddenADLs.includes(adl)) {
            newConfig.hiddenADLs.splice(newConfig.hiddenADLs.indexOf(adl), 1)
        } else {
            newConfig.hiddenADLs.push(adl)
        }
        handler(newConfig)
    }
    return (
        <>
            <input type="button" className={`configbutton`} onClick={() => openHandler(!open)} value={open ? "-" : "+"} />
            {open && <ul className={`configmenu`}>
                <li className={`header`}>Hide ADLs:</li>
                {ADLs.map(adl => <li className={`option`} onClick={() => handleClick(adl.key)}><img src={`/adl-icons/${adl.icon}`} />{adl.label}<input type="checkbox" checked={config.hiddenADLs.includes(adl.key)} /></li>)}
            </ul>}
        </>
    )
}