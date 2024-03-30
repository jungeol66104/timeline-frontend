import {TimelineEvent} from "@/store/slices/contentsSlice";
import crypto from 'crypto'
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
    return scrollWrapper
}

export const getIsBaseImage = (url: string | null | undefined) => {
    if (typeof url !== "string") return true
    return url.includes("https://cdn.timeline.vg/base-image.png")
}

let timeoutId: any
export const debounce = (callback: any, delay: number) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
}

export const formatDate = (date: string | undefined) => {
    if (!date) return

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [datePart, timePart] = date.split(" ");
    const [year, month, day] = datePart.split("-");
    const formattedMonth = months[parseInt(month, 10) - 1];

    return `${formattedMonth} ${parseInt(day, 10)}, ${year}`;
}

export const mapStrToNum = (inputString : string) => {
    const hash1 = crypto.createHash('sha256').update(inputString).digest('hex');
    const hash2 = crypto.createHash('md5').update(inputString).digest('hex');
    const combinedHash = hash1 + hash2;
    let hashedNumber = BigInt('0x' + combinedHash); // Use BigInt to handle large numbers
    return Number((hashedNumber % BigInt(4)) + BigInt(1));
}