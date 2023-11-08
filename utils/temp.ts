// session storage logic
// if ((!isToggle && contentOrder === 0 && event.overlap === 0) || isToggle) {
//     const scrollWrapper = document.querySelector('.page')
//     if (!scrollWrapper) return
//     sessionStorage.setItem('currentEvents',JSON.stringify(currentEvents))
//     sessionStorage.setItem('totalHeight',JSON.stringify(totalHeight))
//     sessionStorage.setItem('currentDepth', JSON.stringify(currentDepth))
//     sessionStorage.setItem('scrollTop', JSON.stringify(scrollWrapper.scrollTop))
//     sessionStorage.setItem('lastAction', 'enter')
//     return
// }

// import {TimelineEvent} from "@/public/events";
//
// export const julianDateToEvent = (julianDate: number, events: TimelineEvent[]): TimelineEvent => {
//     let julianDateEvents = events.filter(event => event.julianDate === julianDate)
//     let overlap = julianDateEvents.length - 1
//     if (overlap > 2) overlap = 2
//     let lowestDepth = Math.min(...julianDateEvents.map(jEvent => jEvent.depth) as number[])
//     return {...julianDateEvents.find(jEvent => jEvent.depth === lowestDepth), overlap: overlap} as TimelineEvent
// }