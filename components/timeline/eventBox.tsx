import React from "react";
import {TimelineEvent} from "@/store/slices/contentsSlice";
import EventNode from "@/components/timeline/eventNode";
import EventContent from "@/components/timeline/eventContent";
// refactoring: clear

const EventBox = ({event} : {event: TimelineEvent}) => {
    return (
        <div className={`eventBox relative flex pt-[6px] flex-shrink-0 pb-1.5`}>
            <EventNode />
            <EventContent event={event}/>
        </div>
    )
}
export default EventBox