import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {TimelineEvent} from "@/public/events";
import React from "react";
import BlankBox from "@/components/timeline/blankBox";
import AfterEventBox from "@/components/timeline/afterEventBox";

const AfterEffect = () => {
    const prevEventsWithEffect = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect)
    const afterEffectTop = useSelector((state: RootState) => state.reducer.events.afterEffectTop)
    return (
        <div className={'afterEffect absolute left-0'} style={{top: `${afterEffectTop + 10}px`}}>
            {prevEventsWithEffect.map((event: TimelineEvent) => {
                if (event.fadeout || event.distance) {
                    return <AfterEventBox key={event.id} event={event} />
                } return <BlankBox key={event.id} event={event} />
            })}
        </div>
    )
}

export default AfterEffect