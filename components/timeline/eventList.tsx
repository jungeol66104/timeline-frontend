import {TimelineEvent} from "@/public/events";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import React, {useEffect} from "react";
import {updateToggleEvents} from "@/store/slices/eventsSlice";

import EventContent from "@/components/timeline/eventContent";
import EventListHeader from "@/components/timeline/eventListHeader";
import OverlapContent1 from "@/components/timeline/overlapContent1";
import OverlapContent2 from "@/components/timeline/overlapContent2";

const EventList = ({event} : {event: TimelineEvent}) => {
    const currentEvents = useSelector((state: RootState) => state.reducer.events.currentEvents)
    const eventOrder = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = useSelector((state: RootState) => state.reducer.events.currentEvents[eventOrder].isToggle)
    const toggleEvents = useSelector((state: RootState) => state.reducer.events.currentEvents[eventOrder].toggleEvents)

    const listHeight = !isToggle ? 112 : 28 + (toggleEvents.length + 1) * 124

    return (
        <div style={{height: listHeight, transition: 'height 0.5s'}}>
            <EventListHeader event={event}/>
            <EventContent event={event} eventOrder={eventOrder} contentOrder={0} isToggle={isToggle}/>
            <div className={'relative pt-[12px]'}>{toggleEvents.map((tEvent: TimelineEvent, i) => <EventContent key={i} event={tEvent} eventOrder={eventOrder} contentOrder={i+1} isToggle={isToggle}/>)}</div>
            <><OverlapContent1 event={event}/><OverlapContent2 event={event}/></>
        </div>
    )
}
export default EventList