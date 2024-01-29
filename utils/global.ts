import {TimelineEvent} from "@/store/slices/contentsSlice";
// refactoring: clear

// variables
const aboveTimelineHeight = 70
const eventContentHeight = 124
const overlapBottomHeight = 6
const eventListHeaderHeight = 38
export const allTimelines = {
        "name": "All timelines",
        "description": "",
        "timelines": [
            {"id": 1,"name":"Joe Biden","description": "The 46th U.S. President", "image": ''},
            {"id": 6,"name":"Global Financial Crisis","description": "Worldwide economic collapse of 2008", "image": ''},
            {"id": 3,"name":"Xi Jinping","description": "The 18th and 19th General Secretary of the Chinese Communist Party", "image": ''},
            {"id": 2,"name":"Donald Trump","description": "The 45th U.S. President", "image": ''},
            {"id": 4,"name":"Yoon Seok Yeol","description": "The 20th President of South Korea", "image": ''},
            {"id": 5,"name":"Moon Jae In","description": "The 19th President of South Korea", "image": ''},
            {"id": 8,"name":"Asian Financial Crisis","description": "1997 economic turmoil in Asian countries", "image": ''},
            {"id": 9,"name":"Great Depression","description": "Widespread poverty, unemployment, and economic hardship in 1930s", "image": ''},
            {"id": 7,"name":"Mohamed Bin Salman","description": "The Crown Prince of Saudi Arabia", "image": ''},
        ]
    }

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

