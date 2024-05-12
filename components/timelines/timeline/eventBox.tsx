import React from "react";
import {TimelineEvent} from "@/store/slices/contentsSlice";
import EventNode from "@/components/timelines/timeline/eventNode";
import EventContent from "@/components/timelines/timeline/eventContent";

const EventBox = ({event} : {event: TimelineEvent}) => {
    return (
        <div className={`eventBox relative flex pt-[6px] flex-shrink-0 pb-1.5`}>
            <EventNode />
            <EventContent event={event}/>
        </div>
    )
}
export default EventBox