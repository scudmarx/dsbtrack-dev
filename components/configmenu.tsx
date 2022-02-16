import { ADLs, IConfigState } from "../api/data"

export function ConfigMenu ({config = {hiddenADLs: []}, handler = () => {}, openHandler = () => {}, open = true}: {config: IConfigState, handler: Function, openHandler: Function, open: boolean}): JSX.Element {
    const handleShowADLClick = (adl: string) => {
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
    const toggleUsePartials = () => {
        const newConfig = {
            ...config,
            use_partials: !config.use_partials
        }
        handler(newConfig)
    }
    return (
        <>
            <input type="button" className={`configbutton`} onClick={() => openHandler(!open)} value={open ? "-" : "+"} />
            {open && <ul className={`configmenu`}>
                <li className={`header`}>Optional behaviours:</li>
                    <li className={`option`} title="Allow partial achievements. Click an ADL multiple times to cycle through." onClick={() => toggleUsePartials()}>Use partial completion:<input type="checkbox" checked={config.use_partials} /></li>
                <li className={`header`}>Show ADLs:</li>
                    {ADLs.map((adl, i) => <li key={i} className={`option`} onClick={() => handleShowADLClick(adl.key)}><img src={`/adl-icons/${adl.icon}`} />{adl.label}<input type="checkbox" checked={!config.hiddenADLs.includes(adl.key)} /></li>)}
            </ul>}
        </>
    )
}