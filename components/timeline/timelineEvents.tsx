import {useSelector} from "react-redux";
import {TimelineEvent} from "@/public/events";
import EventBox from "@/components/timeline/eventBox";
import {selectCurrentEventsWithEffect} from "@/store/slices/contentsSlice";
import {useEffect} from "react";
// refactoring: clear

const TimelineEvents = () => {
    const currentEventsWithEffect = useSelector(selectCurrentEventsWithEffect)

    // useEffect(() => {
    //     const container = document.querySelector('.container')
    //     const reference = document.querySelector('.testBox')
    //     if (!container || !reference) return
    //
    //     const newTestBox = document.createElement('div')
    //     newTestBox.style.height = '100px'
    //     newTestBox.style.width = '100px'
    //     newTestBox.style.border = '2px solid black'
    //
    //     setTimeout(() => {
    //         container.insertBefore(newTestBox , reference)
    //     }, 5000)
    // }, []);

    return (
        <div className={'timelineEvents absolute w-full flex flex-col'}>
            {currentEventsWithEffect.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
        </div>
    )
}
export default TimelineEvents