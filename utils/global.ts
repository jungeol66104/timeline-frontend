import {TimelineEvent} from "@/store/slices/contentsSlice";
// refactoring: clear

// variables
const aboveTimelineHeight = 70
const eventContentHeight = 124
const overlapBottomHeight = 6
const eventListHeaderHeight = 38
export const temporarySeries = [
    {
        "name": "금융 위기",
        "description": "되풀이되는 금융의 역사를 보고싶다면",
        "timelines": [
            {"id": 6, "name": "글로벌 금융 위기", "description": "2008 리먼 브라더스 사태"},
            {"id": 8, "name": "아시아 금융 위기", "description": "태국, 한국 등 아시아에서부터 시작된 국제 금융 위기"},
            // {"id": "1","title":"","description": ""},
        ]
    },
    {
        "name": "국가 원수",
        "description": "세계 각국의 대표자들",
        "timelines": [
            {"id": 7,"name":"모하메드 빈 살만","description": "사우디아라비아의 왕세자"},
            {"id": 2,"name":"도널드 트럼프","description": "제45대 미국 대통령"},
            {"id": 1,"name":"조 바이든","description": "제46대 미국 대통령"},
            {"id": 3,"name":"시진핑","description": "제7대 중화인민공화국 국가주석"},
            {"id": 4,"name":"윤석열","description": "제20대 대한민국 대통령"},
            {"id": 5,"name":"문재인","description": "제19대 대한민국 대통령"},
        ]
    },
    {
        "name": "전체 타임라인",
        "description": " ",
        "timelines": [
            {"id": 1,"name":"조 바이든","description": "제46대 미국 대통령"},
            {"id": 6,"name":"글로벌 금융 위기","description": "2008 리먼 브라더스 사태"},
            {"id": 2,"name":"도널드 트럼프","description": "제45대 미국 대통령"},
            {"id": 4,"name":"윤석열","description": "제20대 대한민국 대통령"},
            {"id": 5,"name":"문재인","description": "제19대 대한민국 대통령"},
            {"id": 3,"name":"시진핑","description": "제7대 중화인민공화국 국가주석"},
            {"id": 8,"name":"아시아 금융 위기","description": "태국, 한국 등 아시아에서부터 시작된 국제 금융 위기"},
            {"id": 7,"name":"모하메드 빈 살만","description": "사우디아라비아의 왕세자"},
        ]
    }
]

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

