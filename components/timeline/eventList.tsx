import {TimelineEvent} from "@/public/events";
import {useSelector} from "react-redux";
import React from "react";
import EventContent from "@/components/timeline/eventContent";
import EventListHeader from "@/components/timeline/eventListHeader";
import OverlapContent from "@/components/timeline/overlapContent";
import {selectCurrentEvents} from "@/store/slices/contentsSlice";
// refactoring: needed

const EventList = ({event} : {event: TimelineEvent}) => {

    const currentEvents = useSelector(selectCurrentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = currentEvents[eventOrderInCurrent].isToggle
    const toggleEvents = currentEvents[eventOrderInCurrent].toggleEvents as any[]

    const listHeight = !isToggle ? 112 : 28 + (toggleEvents.length + 1) * 124

    return (
        <div className={'relative'} style={{width: 'calc(100% - 22px)',height: listHeight, transition: 'height 0.5s'}}>
            <EventListHeader event={event}/>
            <EventContent event={event} eventOrder={eventOrderInCurrent} contentOrder={0} isToggle={isToggle}/>
            {toggleEvents.map((tEvent: TimelineEvent, i) => <EventContent key={i} event={tEvent} eventOrder={eventOrderInCurrent} contentOrder={i+1} isToggle={isToggle}/>)}
            <OverlapContent event={event} order={1}/>
            <OverlapContent event={event} order={2}/>
        </div>
    )
}
export default EventList