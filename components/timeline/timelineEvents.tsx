import {useSelector} from "react-redux";
import {TimelineEvent} from "@/store/slices/contentsSlice";
import EventBox from "@/components/timeline/eventBox";
import {selectCurrentEventsWithEffect} from "@/store/slices/contentsSlice";
import TimelineEventsEdge from "@/components/timeline/timelineEventsEdge";
import React, {Suspense} from "react";
import {selectIsBottomEnd, selectIsTopEnd} from "@/store/slices/appearanceSlice";
import TimelineEventsTop from "@/components/timeline/timelineEventsTop";
import TimelineEventsBottom from "@/components/timeline/timelineEventsBottom";
// refactoring: clear

const TimelineEvents = () => {
    const currentEventsWithEffect = useSelector(selectCurrentEventsWithEffect)
    const isTopEnd = useSelector(selectIsTopEnd)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={'timelineEvents max-w-[650px] flex flex-col mx-[20px]'} style={{width: `calc(100% - 40px)`}}>
            <TimelineEventsEdge type={'top'} isEnd={isTopEnd} />
            {currentEventsWithEffect.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
            <TimelineEventsEdge type={'bottom'} isEnd={isBottomEnd} />
        </div>
    )
}
export default TimelineEvents