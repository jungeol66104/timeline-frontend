import {useSelector} from "react-redux";
import {TimelineEvent} from "@/store/slices/contentsSlice";
import AfterEventBox from "@/_deprecated/afterEffect/afterEventBox";
import {selectPrevEventsWithEffect} from "@/store/slices/contentsSlice";
import {selectAfterEffectTop, selectTotalHeight} from "@/store/slices/appearanceSlice";
// refactoring: needed (alignment problem of toggled prevEvent with currentEvent when it is at the end)

const AfterEffectEvents = () => {
    const prevEventsWithEffect = useSelector(selectPrevEventsWithEffect)
    const afterEffectTop = useSelector(selectAfterEffectTop)
    const totalHeight = useSelector(selectTotalHeight)

    return (
        <div className={'absolute w-full'} style={{pointerEvents: 'none', overflow: "hidden", height: `${totalHeight + 10}px`}}>
            <div className={'absolute left-0'} style={{width: '100%' ,top: `${afterEffectTop}px`}}>
                {prevEventsWithEffect.map((event: TimelineEvent) => {
                    return <AfterEventBox key={event.id} event={event} />
                })}
            </div>
        </div>
    )
}
export default AfterEffectEvents