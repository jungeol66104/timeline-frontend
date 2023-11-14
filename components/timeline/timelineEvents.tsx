import {useSelector} from "react-redux";
import {TimelineEvent} from "@/public/events";
import EventBox from "@/components/timeline/eventBox";
import {selectCurrentEventsWithEffect} from "@/store/slices/contentsSlice";
// refactoring: clear

const TimelineEvents = () => {
    const currentEventsWithEffect = useSelector(selectCurrentEventsWithEffect)
    return (
        <div className={'timelineEvents absolute w-full flex flex-col overflow-hidden'}>
            {currentEventsWithEffect.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
        </div>
    )
}
export default TimelineEvents