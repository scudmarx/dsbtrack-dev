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
    {label: "Dressing"},
    {label: "Eating"},
    {label: "Ambulating"},
    {label: "Toilet"},
    {label: "Hygiene"},
    {label: "Shopping"},
    {label: "Housekeeping"},
    {label: "Accounts"},
    {label: "Food Prep"},
    {label: "Telecoms"},
    {label: "Belonging"},
    {label: "Others"},
    {label: "Medication"},
    {label: "Becoming"},
    {label: "Self-Actualization"},
]
