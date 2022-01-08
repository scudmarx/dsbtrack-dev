export interface IRecordState {
    [key: string]: ICheckIn;
}

export interface ICheckIn {
    affect: IAffectScore;
    adls: {[key:string]: boolean};
}

export interface IAffectScore {
    valence: number
    arousal: number
}

export const toDayString = (date: Date) => {
    return date.toISOString().slice(0,10)
}

export function saveData(record: IRecordState) {
    for(let checkin in record) {
        for (const adl in record[checkin].adls) {
            if (!record[checkin].adls[adl]) {
              delete record[checkin].adls[adl];
            }
          }
        if (Object.keys(record[checkin]?.adls).length > 0) {
            let data = JSON.stringify(record[checkin]);
            console.log(checkin, data)
            //localStorage[checkin] = data
        }
    };
}

export function loadData() {
    let data: IRecordState = {}
    for (const datum in localStorage) {
        console.log(datum, localStorage[datum])
        //data[datum] = JSON.parse(localStorage[datum])
    }
    //console.log(data)
    //return data
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
