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
    const dispatch = useDispatch()

    const data: TimelineEvent[] = useSelector((state: RootState) => state.reducer.events.data)
    const currentEvents = useSelector((state: RootState) => state.reducer.events.currentEvents)
    const eventOrder = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = useSelector((state: RootState) => state.reducer.events.currentEvents[eventOrder].isToggle)
    const toggleEvents = useSelector((state: RootState) => state.reducer.events.currentEvents[eventOrder].ToggleEvents)

    useEffect(() => {
        if(isToggle) {
            const newToggleEvents = data.filter(e => e.julianDate === event.julianDate).filter(e => e.id !== event.id)
            dispatch(updateToggleEvents({order: eventOrder, toggleEvents: newToggleEvents}))
        }
    }, [isToggle]);

    return (
        <div>
            {isToggle ? <EventListHeader event={event}/> : <></>}
            <EventContent event={event} eventOrder={eventOrder} isToggle={isToggle}/>
            {isToggle
                ? <div className={'flex flex-col pt-[12px] gap-[12px]'}>{toggleEvents.map(tEvent => <EventContent event={tEvent} eventOrder={eventOrder} isToggle={isToggle}/>)}</div>
                : <><OverlapContent1 event={event}/><OverlapContent2 event={event}/></>
            }
        </div>
    )
}
export default EventList