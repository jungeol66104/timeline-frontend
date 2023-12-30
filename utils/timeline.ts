// import {TimelineEvent} from "@/store/slices/contentsSlice";
//
// const getSwipedEvent = (scrollWrapper: HTMLDivElement, e: WheelEvent | TouchEvent | MouseEvent) : TimelineEvent => {
//     let clientYInContainer = 0
//     if (e instanceof TouchEvent) {clientYInContainer = scrollWrapper.scrollTop + e.changedTouches[0].clientY - 60}
//     else {clientYInContainer = scrollWrapper.scrollTop + e.clientY  - 60}
//     let order = 0
//     if (clientYInContainer - aboveTimelineHeight > 0) order = CurrentEventTops.findLastIndex(top => top < clientYInContainer - aboveTimelineHeight)
//     let top = CurrentEventTops[order] + aboveTimelineHeight - scrollWrapper.scrollTop
//     let boxTop = top
//     if (currentEvents[order].isToggle) {
//         let clientYInBox = clientYInContainer - (CurrentEventTops[order] + aboveTimelineHeight)
//         let orderInBox = 0
//         if (clientYInBox > 38) {orderInBox = Math.floor((clientYInBox - 38) / 124)}
//         boxTop = 38 + orderInBox * 124
//     }
//     return {...currentEvents[order], order: order, top: top, boxTop: boxTop}
// }