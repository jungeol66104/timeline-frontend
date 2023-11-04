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
    let lowestDepth = Math.min(...julianDateEvents.map(jEvent => jEvent.depth) as number[])
    return {...julianDateEvents.find(jEvent => jEvent.depth === lowestDepth), overlap: overlap} as TimelineEvent
}
export const getEventHeights = (events: TimelineEvent[])=> {
    return events.map(event => {
        if (event.isToggle && event.toggleEvents) return (38 + (event.toggleEvents.length + 1) * 124)
        else return (124 + (event.overlap as number) * 6)
    }) as number[]
}