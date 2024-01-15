import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import TimelineHeader from "@/components/timeline/timeilneHeader";
// refactoring: clear

const TimelineEventsEdge = ({type, isEnd} : {type: string, isEnd: boolean}) => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'flex items-center justify-center bg-white h-[60px]'} style={{padding: type === 'top' && isEnd ? '0 0 0 0' : type === 'bottom' ? '0 0 10px 22px' : '10px 0 0 22px', justifyContent: type === 'top' && isEnd ? 'left' : "center", zIndex: type === 'top' && isEnd ? 50 : 0, margin: type === 'top' ? '0 0 10px 0': '10px 0 0 0'}}>
            { !isEnd
                ? <div className={'h-[15px] w-[15px] rounded-full border-gray-600 border-l-white border-2 animate-spin '}></div>
                : type === 'top'
                    ?  <div className={'absolute flex items-center gap-2.5 w-full'}><TimelineHeader /></div>
                    : <div className={'text-xs text-center'}>
                        <b>마지막 이벤트</b><br/>
                        줌 상태를 변경해보세요.
                    </div>
            }
        </div>
    )
}
export default TimelineEventsEdge