import {useSelector} from "react-redux";
import {TimelineEvent} from "@/public/events";
import AfterEventBox from "@/components/timeline/afterEventBox";
import {selectPrevEventsWithEffect} from "@/store/slices/contentsSlice";
import {selectAfterEffectTop, selectTotalHeight} from "@/store/slices/appearanceSlice";
// refactoring: clear

const AfterEffectEvents = () => {
    const prevEventsWithEffect = useSelector(selectPrevEventsWithEffect)
    const afterEffectTop = useSelector(selectAfterEffectTop)
    const totalHeight = useSelector(selectTotalHeight)

    return (
        <div className={'pointer-events-none absolute w-full overflow-hidden'} style={{overflow: "hidden", height: `${totalHeight + 20}px`}}>
            <div className={'absolute left-0'} style={{width: '100%' ,top: `${afterEffectTop + 10}px`}}>
                {prevEventsWithEffect.map((event: TimelineEvent) => {
                    return <AfterEventBox key={event.id} event={event} />
                })}
            </div>
        </div>
    )
}
export default AfterEffectEvents