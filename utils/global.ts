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
export const getEventHeights = (events: TimelineEvent[])=> {
    return events.map(event => {
        if (event.isToggle && event.toggleEvents) return (38 + (event.toggleEvents.length + 1) * 124)
        else return (124 + (event.overlap as number) * 6)
    }) as number[]
}

export const getClickOrTouch = () => {
    let clickOrTouchend = 'click'
    if (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement) clickOrTouchend = 'touchend'
    return clickOrTouchend
}