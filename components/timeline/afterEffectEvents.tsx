import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {TimelineEvent} from "@/public/events";
import React from "react";
import AfterEventBox from "@/components/timeline/afterEventBox";

const AfterEffectEvents = () => {
    const prevEventsWithEffect = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect)
    const afterEffectTop = useSelector((state: RootState) => state.reducer.events.afterEffectTop)

    return (
        <div className={'pointer-events-none afterEffect absolute left-0'} style={{top: `${afterEffectTop + 10}px`}}>
            {prevEventsWithEffect.map((event: TimelineEvent) => {
                return <AfterEventBox key={event.id} event={event} />
            })}
        </div>
    )
}
export default AfterEffectEvents