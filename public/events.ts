const events = [
    {
        id: 0,
        date: '0000. 00. 00.',
        title: '메이저',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 0,
    },
    {
        id: 1,
        date: '0000. 00. 00.',
        title: '마이너',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 1,
    },
    {
        id: 2,
        date: '0000. 00. 00.',
        title: '마이너',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 1,
    },
    {
        id: 3,
        date: '0000. 00. 00.',
        title: '메이저',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 0,
    },
    {
        id: 4,
        date: '0000. 00. 00.',
        title: '마이너',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 1,
    },
    {
        id: 5,
        date: '0000. 00. 00.',
        title: '메이저',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 0,
    },
    {
        id: 6,
        date: '0000. 00. 00.',
        title: '마이너',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 1,
    },
        {
        id: 7,
        date: '0000. 00. 00.',
        title: '메이저',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 0,
    },
        {
        id: 8,
        date: '0000. 00. 00.',
        title: '메이저',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 0,
    },
        {
        id: 9,
        date: '0000. 00. 00.',
        title: '마이너',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 1,
    },
        {
        id: 10,
        date: '0000. 00. 00.',
        title: '마이너',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 1,
    },
        {
        id: 11,
        date: '0000. 00. 00.',
        title: '메이저',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 0,
    },
        {
        id: 12,
        date: '0000. 00. 00.',
        title: '메이저',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 0,
    },
        {
        id: 13,
        date: '0000. 00. 00.',
        title: '마이너',
        content: '오늘은 맑은 날씨에 바람이 부드럽게 불고 있어서 나들이하기 딱 좋아요. 아침에는 산책을 하면서 새들의 노래를 듣고, 오후에는 카페에서 친구들과 커피를 마시며 이야기를 나눴어요. 저녁에는 가족과 함께 맛있는 한식 식사를 즐겼고, 밤에는 별들을 보며 휴식했어요.',
        depth: 1,
    },
    ]

export default events

export interface Event {
    id: number
    date: string
    title: string
    content: string
    depth: number
}