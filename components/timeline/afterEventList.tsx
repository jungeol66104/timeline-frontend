import {TimelineEvent} from "@/public/events";
import {useSelector} from "react-redux";
import {RootState} from "@/store/rootReducer";
import React from "react";

import EventContent from "@/components/timeline/eventContent";
import OverlapContent1 from "@/components/timeline/overlapContent1";
import OverlapContent2 from "@/components/timeline/overlapContent2";
import AfterEventListHeader from "@/components/timeline/afterEventListHeader";

const AfterEventList = ({event} : {event: TimelineEvent}) => {
    const prevEventsWithEffect = useSelector((state: RootState) => state.events.prevEventsWithEffect)
    const eventOrder = prevEventsWithEffect.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = useSelector((state: RootState) => state.events.prevEventsWithEffect[eventOrder].isToggle)
    const toggleEvents = useSelector((state: RootState) => state.events.prevEventsWithEffect[eventOrder].toggleEvents)

    const listHeight = !isToggle ? 112 : 28 + (toggleEvents.length + 1) * 124

    return (
        <div className={'relative'} style={{width: 'calc(100% - 22px)',height: listHeight, transition: 'height 0.5s'}}>
            <AfterEventListHeader event={event}/>
            <EventContent event={event} eventOrder={eventOrder} contentOrder={0} isToggle={isToggle}/>
            {toggleEvents.map((tEvent: TimelineEvent, i) => <EventContent key={i} event={tEvent} eventOrder={eventOrder} contentOrder={i+1} isToggle={isToggle} isPrev={true}/>)}
            <OverlapContent1 event={event}/>
            <OverlapContent2 event={event}/>
        </div>
    )
}

export default AfterEventList