import {useSelector} from "react-redux";
import {TimelineEvent} from "@/public/events";
import EventBox from "@/components/timeline/eventBox";
import {selectCurrentEventsWithEffect} from "@/store/slices/contentsSlice";
import TimelineEventsEdge from "@/components/timeline/timelineEventsEdge";
import Link from "next/link";
import React from "react";
// refactoring: clear

const TimelineEvents = () => {
    const currentEventsWithEffect = useSelector(selectCurrentEventsWithEffect)

    return (
        <div className={'timelineEvents absolute w-full max-w-lg flex flex-col'}>
            <TimelineEventsEdge type={'top'} />
            <Link href={'/'}>hohohohohoho</Link>
            {currentEventsWithEffect.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
            <TimelineEventsEdge type={'bottom'} />
        </div>
    )
}
export default TimelineEvents