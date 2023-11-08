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
        <div className={'absolute w-full bg-blue-500'} style={{pointerEvents: 'none', overflow: "hidden", height: `${totalHeight + 20}px`}}>
            <div className={'absolute left-0'} style={{width: '100%' ,top: `${afterEffectTop}px`}}>
                {prevEventsWithEffect.map((event: TimelineEvent) => {
                    return <AfterEventBox key={event.id} event={event} />
                })}
            </div>
        </div>
    )
}
export default AfterEffectEvents