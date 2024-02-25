import {TimelineEvent} from "@/store/slices/contentsSlice";
// refactoring: clear

// variables
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

export const getScrollWrapper = () => {
    const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
    // const scrollWrapper: HTMLElement | null = typeof window !== 'undefined' ? document.documentElement : null
    return scrollWrapper
}

export const getIsBaseImage = (url: string | null | undefined) => {
    if (typeof url !== "string") return true
    return url.includes('https://timeline-image.s3.ap-northeast-2.amazonaws.com/base-image.png')
}

let timeoutId: any
export const debounce = (callback: any, delay: number) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
}