import {TimelineEvent} from "@/store/slices/contentsSlice";
import {useSelector} from "react-redux";
import React from "react";
import EventContent from "@/components/timeline/eventContent";
import EventListHeader from "@/components/timeline/eventListHeader";
import OverlapContent from "@/components/timeline/overlapContent";
import {selectCurrentEvents} from "@/store/slices/contentsSlice";
import {selectLastAction} from "@/store/slices/appearanceSlice";
// refactoring: clear

const EventList = ({event} : {event: TimelineEvent}) => {

    const lastAction = useSelector(selectLastAction)
    const currentEvents = useSelector(selectCurrentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = currentEvents[eventOrderInCurrent].isToggle
    const toggleEvents = currentEvents[eventOrderInCurrent].toggleEvents as any[]

    const listHeight = !isToggle ? 112 : 28 + (toggleEvents.length + 1) * 124
    const transition = lastAction === 'toggle' ? 'height 0.5s' : ''

    return (
        <div className={'relative'} style={{width: 'calc(100% - 22px)',height: listHeight, transition: transition}}>
            <EventListHeader event={event}/>
            <EventContent key={0} event={event} highestEvent={event} contentOrder={0} isToggle={isToggle}/>
            {toggleEvents.map((tEvent: TimelineEvent, i) => <EventContent key={i+1} event={tEvent} highestEvent={event} contentOrder={i+1} isToggle={isToggle}/>)}
            <OverlapContent event={event} order={0}/>
            <OverlapContent event={event} order={1}/>
        </div>
    )
}
export default EventList