export interface IConfigState {
    hiddenADLs: string[]
    use_partials?: boolean;
}

export interface IRecordState {
    [key: string]: ICheckIn;
}

export interface ICheckIn {
    affect?: IAffectScore;
    adls: string[];
    partial_adls?: string[];
}

export interface IAffectScore {
    valence: number
    arousal: number
}

export const newCheckIn = (): ICheckIn => ({
    adls: []
})

export const toDayString = (date: Date) => {
    return date.toISOString().slice(0,10)
}

export function saveData(record: IRecordState) {
    for(let checkin in record) {
        if (record[checkin].adls && (record[checkin].adls.length > 0) || (record[checkin].partial_adls && (record[checkin].partial_adls as string[]).length > 0)) {
            let data = JSON.stringify(record[checkin]);
            localStorage[`dsbtracker-${checkin}`] = data
        } else {
            delete localStorage[`dsbtracker-${checkin}`]
        }
    };
}
export function saveConfig(config: IConfigState) {
    localStorage[`dsbtracker-config`] = JSON.stringify(config)
}
export function loadConfig(): IConfigState {
    return (localStorage[`dsbtracker-config`]) ? JSON.parse(localStorage[`dsbtracker-config`]) : {hiddenADLs: []}
}

export function loadData(): IRecordState {
    let data: IRecordState = {}
    for (const datum in localStorage) {
        if (datum.startsWith("dsbtracker-") && !datum.startsWith("dsbtracker-config"))
        data[datum.replace("dsbtracker-", "")] = JSON.parse(localStorage[datum])
    }
    console.log("Loaded data:", data)
    return data
}

export const ADLs = [
    {key: "D", label: "Dressing", icon:"Dressing.png", group:"adl"},
    {key: "D2", label: "Dressy", icon:"Dressy.png", group:"adl"},
    {key: "E", label: "Eating", icon:"Eating.png", group:"adl"},
    {key: "A", label: "Ambulating", icon:"Ambulating.png", group:"adl"},
    {key: "T", label: "Toilet", icon:"Toilet.png", group:"adl"},
    {key: "H", label: "Hygiene", icon:"Hygiene.png", group:"adl"},
    {key: "T3", label: "Teeth", icon:"Teeth.png", group:"adl"},
    {key: "S", label: "Shopping", icon:"Shopping.png", group:"iadl"},
    {key: "H2", label: "Housekeeping", icon:"Housekeeping.png", group:"iadl"},
    {key: "A2", label: "Accounts", icon:"Accounts.png", group:"iadl"},
    {key: "F", label: "Food Prep", icon:"Food Prep.png", group:"iadl"},
    {key: "T2", label: "Telecoms", icon:"Telecoms.png", group:"iadl"},
    {key: "B2", label: "Becoming", icon:"Becoming.png", group:"sadl"},
    {key: "O", label: "Others", icon:"Others.png", group:"sadl"},
    {key: "M", label: "Medication", icon:"Medication.png", group:"sadl"},
    {key: "S3", label: "Sleep", icon:"Pillow.png", group:"sadl"},
    {key: "B", label: "Belonging", icon:"Belonging.png", group:"sadl"},
    {key: "S2", label: "Self-Care", icon:"Self-Care.png", group:"sadl"},
    {key: "S4", label: "Soothing", icon:"Stabby.png", group:"sadl"},
]
