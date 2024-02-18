import {TimelineEvent} from "@/store/slices/contentsSlice";
// refactoring: clear

// variables
const aboveTimelineHeight = 70
const eventContentHeight = 124
const overlapBottomHeight = 6
const eventListHeaderHeight = 38

// math
export const sum = (array: number[]) => {
    let sum = 0
    array.forEach(l => sum += l)
    return sum
}

// timeline
// normally used for getting positions of certain events by calculating height of each event
export const getEventHeights = (events: TimelineEvent[])=> {
    return events.map(event => {
        if (event.isToggle && event.toggleEvents) return (eventListHeaderHeight + (event.toggleEvents.length + 1) * eventContentHeight)
        else return (eventContentHeight + (event.overlap as number) * overlapBottomHeight)
    }) as number[]
}

// check if the device is mobile or PC
export const getClickOrTouch = () => {
    let clickOrTouchend = 'click'
    if (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement) clickOrTouchend = 'touchend'
    return clickOrTouchend
}

// export const isBaseImage = (url: string) => {
//     if ()
// }