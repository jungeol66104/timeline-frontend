import {useSelector} from "react-redux";
import {selectCurrentEvents, selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectCurrentDepth} from "@/store/slices/appearanceSlice";
// refactoring: needed (change temp logic for isEnd after API is completed)

const TimelineEventsEdge = ({type, isEnd = true} : {type: string, isEnd?: boolean}) => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentDepth = useSelector(selectCurrentDepth)

    // temp logic for isEnd
    if ((type === 'top' && currentDepth === 2 && currentEvents.findIndex(cEvent => cEvent.id === 31) === -1)
        || (type === 'bottom' && currentDepth === 2 && currentEvents.findIndex(cEvent => cEvent.id === 7) === -1)
    ) isEnd = false

    return (
        <div className={'flex items-center justify-center bg-white h-[60px]'} style={{padding: type === 'top' && isEnd ? '0 0 0 0' : type === 'bottom' ? '0 0 10px 22px' : '10px 0 0 22px', justifyContent: type === 'top' && isEnd ? 'left' : "center", zIndex: type === 'top' && isEnd ? 50 : 0, margin: type === 'top' ? '0 0 10px 0': '10px 0 0 0'}}>
            { !isEnd
                ? <div className={'h-[15px] w-[15px] rounded-full border-gray-600 border-l-white border-2 animate-spin '}></div>
                : type === 'top'
                    ? <div className={'text-2xl font-semibold'}>{currentTimeline.name}</div>
                    : <div className={'text-xs text-gray-400 text-center'}>
                        현재 줌 상태의 마지막 이벤트입니다. <br/>
                        좌-우 스와이프로 줌인해보세요.
                    </div>
            }
        </div>
    )
}
export default TimelineEventsEdge