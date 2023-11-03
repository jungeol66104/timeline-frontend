import {TimelineEvent} from "@/public/events";
import {useSelector} from "react-redux";
import {selectCurrentEvents, selectPrevEventsWithEffect} from "@/store/slices/eventsSlice";
// refactoring: needed (integration with overlapContent1)

const OverlapContent2 = ({event} : {event: TimelineEvent}) => {
    const currentEvents = useSelector(selectCurrentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const prevEventsWithEffect = useSelector(selectPrevEventsWithEffect)
    const eventOrderInPrev = prevEventsWithEffect.findIndex(pEvent => pEvent.id === event.id)
    const isToggle = !event.prev ? currentEvents[eventOrderInCurrent].isToggle : prevEventsWithEffect[eventOrderInPrev].isToggle

    const display = event.overlap === 2 ? '' : 'hidden'
    return (
        <div className={`${display} flex-shrink-0 absolute top-[36px] left-[12px] h-[88px] bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md -z-20 transform transition-opacity ease-in-out duration-500 ${!isToggle ? 'opacity-100' : 'opacity-0'}`} style={{width: `calc(100% - 24px)`}}></div>
    )
}

export default OverlapContent2