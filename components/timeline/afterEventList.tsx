import {TimelineEvent} from "@/public/events";
import {useSelector} from "react-redux";
import EventContent from "@/components/timeline/eventContent";
import OverlapContent from "@/components/timeline/overlapContent";
import AfterEventListHeader from "@/components/timeline/afterEventListHeader";
import {selectPrevEventsWithEffect} from "@/store/slices/contentsSlice";

const AfterEventList = ({event} : {event: TimelineEvent}) => {

    const prevEventsWithEffect = useSelector(selectPrevEventsWithEffect)
    const eventOrderInPrev = prevEventsWithEffect.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = prevEventsWithEffect[eventOrderInPrev].isToggle
    const toggleEvents = prevEventsWithEffect[eventOrderInPrev].toggleEvents as any[]

    const listHeight = !isToggle ? 112 : 28 + (toggleEvents.length + 1) * 124

    return (
        <div className={'relative'} style={{width: 'calc(100% - 22px)',height: listHeight, transition: 'height 0.5s'}}>
            <AfterEventListHeader event={event}/>
            <EventContent event={event} eventOrder={eventOrderInPrev} contentOrder={0} isToggle={isToggle}/>
            {toggleEvents.map((tEvent: TimelineEvent, i) => <EventContent key={i} event={tEvent} eventOrder={eventOrderInPrev} contentOrder={i+1} isToggle={isToggle} isPrev={true}/>)}
            <OverlapContent event={event} order={1}/>
            <OverlapContent event={event} order={2}/>
        </div>
    )
}

export default AfterEventList