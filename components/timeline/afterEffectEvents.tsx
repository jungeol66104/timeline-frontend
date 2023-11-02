import {useSelector} from "react-redux";
import {RootState} from "@/store/rootReducer";
import {TimelineEvent} from "@/public/events";
import React from "react";
import AfterEventBox from "@/components/timeline/afterEventBox";

const AfterEffectEvents = () => {
    const prevEventsWithEffect = useSelector((state: RootState) => state.events.prevEventsWithEffect)
    const afterEffectTop = useSelector((state: RootState) => state.events.afterEffectTop)
    const totalHeight = useSelector((state: RootState) => state.events.totalHeight)

    return (
        <div className={'pointer-events-none absolute w-full overflow-hidden'} style={{height: `${totalHeight + 20}px`}}>
            <div className={'absolute left-0'} style={{width: '100%' ,top: `${afterEffectTop + 10}px`}}>
                {prevEventsWithEffect.map((event: TimelineEvent) => {
                    return <AfterEventBox key={event.id} event={event} />
                })}
            </div>
        </div>
    )
}
export default AfterEffectEvents