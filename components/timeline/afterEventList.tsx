import {TimelineEvent} from "@/public/events";
import {useSelector} from "react-redux";
import OverlapContent from "@/components/timeline/overlapContent";
import AfterEventListHeader from "@/components/timeline/afterEventListHeader";
import {selectPrevEventsWithEffect} from "@/store/slices/contentsSlice";
import AfterEventContent from "@/components/timeline/afterEventContent";
// refactoring: clear

const AfterEventList = ({event} : {event: TimelineEvent}) => {

    const prevEventsWithEffect = useSelector(selectPrevEventsWithEffect)
    const eventOrderInPrev = prevEventsWithEffect.findIndex(pEvent => pEvent.id === event.id)
    const isToggle = prevEventsWithEffect[eventOrderInPrev].isToggle
    const toggleEvents = prevEventsWithEffect[eventOrderInPrev].toggleEvents as any[]

    const listHeight = !isToggle ? 112 : 28 + (toggleEvents.length + 1) * 124

    return (
        <div className={'relative'} style={{width: 'calc(100% - 22px)',height: listHeight}}>
            <AfterEventListHeader event={event}/>
            <AfterEventContent key={0} event={event} highestEvent={event} contentOrder={0} isToggle={isToggle}/>
            {toggleEvents.map((tEvent: TimelineEvent, i) => <AfterEventContent key={i+1} event={tEvent} highestEvent={event} contentOrder={i+1} isToggle={isToggle}/>)}
            <OverlapContent event={event} order={1}/>
            <OverlapContent event={event} order={2}/>
        </div>
    )
}

export default AfterEventList