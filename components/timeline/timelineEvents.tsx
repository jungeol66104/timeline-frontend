import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {TimelineEvent} from "@/public/events";
import React from "react";
import EventBox from "@/components/timeline/eventBox";

const TimelineEvents = () => {
    const currentEventsWithEffect = useSelector((state: RootState) => state.reducer.events.currentEventsWithEffect)
    return (
        <>
            {currentEventsWithEffect.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
        </>
    )
}

export default TimelineEvents