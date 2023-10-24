import {TimelineEvent} from "@/public/events";

// math
export const sum = (array: number[]) => {
    let sum = 0
    array.forEach(l => sum += l)
    return sum
}
export const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// timeline
export const julianDateToEvent = (julianDate: number, events: TimelineEvent[]): TimelineEvent => {
    let julianDateEvents = events.filter(event => event.julianDate === julianDate)
    let overlap = julianDateEvents.length - 1
    if (overlap > 2) overlap = 2
    let lowestDepth = Math.min(...julianDateEvents.map(jEvent => jEvent.depth))
    return {...julianDateEvents.find(jEvent => jEvent.depth === lowestDepth), overlap: overlap} as TimelineEvent
}