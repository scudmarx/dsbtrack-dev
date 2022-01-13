export interface IRecordState {
    [key: string]: ICheckIn;
}

export interface ICheckIn {
    affect?: IAffectScore;
    adls: string[];
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
        if (record[checkin].adls.length > 0) {
            let data = JSON.stringify(record[checkin]);
            localStorage[`dsbtracker-${checkin}`] = data
        } else {
            delete localStorage[`dsbtracker-${checkin}`]
        }
    };
}

export function loadData(): IRecordState {
    let data: IRecordState = {}
    for (const datum in localStorage) {
        if (datum.startsWith("dsbtracker-"))
        data[datum.replace("dsbtracker-", "")] = JSON.parse(localStorage[datum])
    }
    console.log("Loaded data:", data)
    return data
}

export const ADLs = [
    {key: "D", label: "Dressing", icon:"/Dressing.png"},
    {key: "E", label: "Eating", icon:"/Eating.png"},
    {key: "A", label: "Ambulating", icon:"/Ambulating.png"},
    {key: "T", label: "Toilet", icon:"/Toilet.png"},
    {key: "H", label: "Hygiene", icon:"/Hygiene.png"},
    {key: "S", label: "Shopping", icon:"/Shopping.png"},
    {key: "H2", label: "Housekeeping", icon:"/Housekeeping.png"},
    {key: "A2", label: "Accounts", icon:"/Accounts.png"},
    {key: "F", label: "Food Prep", icon:"/Food Prep.png"},
    {key: "T2", label: "Telecoms", icon:"/Telecoms.png"},
    {key: "B", label: "Belonging", icon:"/Belonging.png"},
    {key: "O", label: "Others", icon:"/Others.png"},
    {key: "M", label: "Medication", icon:"/Medication.png"},
    {key: "B2", label: "Becoming", icon:"/Becoming.png"},
    {key: "S2", label: "Self-Care", icon:"/Self-Care.png"},
]
