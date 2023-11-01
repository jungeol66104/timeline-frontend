import {julianDateToEvent, getRandomInt} from "@/utils/global";

const arrayOfObjects = Array(71).fill({});
const distribution = Array(7).fill(0).concat(Array(16).fill(1).concat(Array(48).fill(2)))
for (let i = distribution.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [distribution[i], distribution[j]] = [distribution[j], distribution[i]];
}
const events = arrayOfObjects.map((event, i) => {
    return (
        {
            id: i,
            date: '0000. 00. 00.',
            julianDate: getRandomInt(0, 60),
            importance: getRandomInt(1, 1000),
            depth: distribution[i],
            title: distribution[i] === 0 ? '메이저' : distribution[i] === 1 ? '마이너' : '라스트',
            content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
            tag: '#전쟁',
            overlap: 0,
            isToggle: false,
            toggleEvents: []
        }
    )
}).sort((eventA, eventB) => eventA.julianDate - eventB.julianDate)

export default events

const getInitialEvents = (events: TimelineEvent[])=> {
    let initialEvents = events.filter(event => event.depth === 0)
    let initialJulianDates = Array.from(new Set(initialEvents.map(iEvent => iEvent.julianDate)))
    initialEvents = initialJulianDates.map(jDate => julianDateToEvent(jDate, events))
    return initialEvents
}
export const initialEvents = getInitialEvents(events)

export interface TimelineEvent {
    id: number
    date: string
    julianDate: number
    importance: number
    depth: number
    title: string
    content: string
    tag: string
    overlap: number
    isToggle: boolean
    toggleEvents: any[]
    distance?: number
    order?: number
    top?: number
    boxTop?: number
    fadeout?: boolean
    prev?: boolean
    blank?: boolean
}

export interface EventWithOrderTop extends TimelineEvent {
    order: number
    top: number
}
