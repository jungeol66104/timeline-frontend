import {useSelector} from "react-redux";
import {TimelineEvent} from "@/public/events";
import EventBox from "@/components/timeline/eventBox";
import {selectCurrentEventsWithEffect} from "@/store/slices/contentsSlice";
// refactoring: clear

const TimelineEvents = () => {
    const currentEventsWithEffect = useSelector(selectCurrentEventsWithEffect)

    return (
        <div className={'timelineEvents absolute top-[10px] w-full max-w-lg flex flex-col'}>
            <div className={'pl-[22px] flex items-center justify-center h-[30px]'}>
                <div className={'h-[15px] w-[15px] rounded-full border-gray-600 border-l-white border-2 animate-spin '}></div>
            </div>
            {currentEventsWithEffect.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
            <div className={'pl-[22px] flex items-center justify-center h-[30px]'}>
                <div className={'h-[15px] w-[15px] rounded-full border-gray-600 border-l-white border-2 animate-spin '}></div>
            </div>
        </div>
    )
}
export default TimelineEvents