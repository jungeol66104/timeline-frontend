import {TimelineEvent} from "@/public/events";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import React, {useEffect} from "react";
import {updateToggleEvents} from "@/store/slices/eventsSlice";

import EventContent from "@/components/timeline/eventContent";
import EventListHeader from "@/components/timeline/eventListHeader";
import OverlapContent1 from "@/components/timeline/overlapContent1";
import OverlapContent2 from "@/components/timeline/overlapContent2";
import AfterEventListHeader from "@/components/timeline/afterEventListHeader";

const AfterEventList = ({event} : {event: TimelineEvent}) => {
    const prevEventsWithEffect = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect)
    const eventOrder = prevEventsWithEffect.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect[eventOrder].isToggle)
    const toggleEvents = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect[eventOrder].toggleEvents)

    return (
        <div>
            {isToggle ? <AfterEventListHeader event={event}/> : <></>}
            <EventContent event={event} eventOrder={eventOrder} isToggle={isToggle}/>
            {isToggle
                ? <div className={'flex flex-col pt-[12px] gap-[12px]'}>{toggleEvents.map((tEvent: TimelineEvent) => <EventContent key={tEvent.id} event={tEvent} eventOrder={eventOrder} isToggle={isToggle}/>)}</div>
                : <><OverlapContent1 event={event}/><OverlapContent2 event={event}/></>
            }
        </div>
    )
}
export default AfterEventList