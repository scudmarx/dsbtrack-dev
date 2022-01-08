interface RecordState {
    [Key: string]: {
        affect: AffectScore
        adls: {[Key:string]: boolean}[]
    }[]
}

interface AffectScore {
    valence: number
    arousal: number
}

export const toDayString = (date: Date) => {
    return date.toISOString().slice(0,10)
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
