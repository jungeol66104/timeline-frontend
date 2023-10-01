function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
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
            depth: distribution[i],
            title: distribution[i] === 0 ? '메이저' : distribution[i] === 1 ? '마이너' : '라스트',
            content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        }
    )
})

export default events

export interface TimelineEvent {
    id: number
    date: string
    title: string
    content: string
    depth: number
    distance?: number
    order?: number
    top?: number
    fadeout?: boolean
}

export interface EventWithOrderTop extends TimelineEvent {
    order: number
    top: number
}