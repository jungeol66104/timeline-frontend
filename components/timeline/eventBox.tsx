import {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import gsap from "gsap";
import {TimelineEvent} from "@/public/events";
import EventNode from "@/components/timeline/eventNode";
import EventList from "@/components/timeline/eventList";
import {selectCurrentEvents} from "@/store/slices/contentsSlice";
import {selectLastAction} from "@/store/slices/appearanceSlice";
// refactoring: needed (animation logic)

const EventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)

    const lastAction = useSelector(selectLastAction)
    const currentEvents = useSelector(selectCurrentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = currentEvents[eventOrderInCurrent].isToggle

    let zIndex = event.animation === 'fadeIn' || event.animation === 'fadeOut' ? '10' : '20'
    let paddingBottom = event.overlap === 0 || isToggle ? 'pb-[6px]' : event.overlap === 1 ? 'pb-[12px]' : 'pb-[18px]'

    useEffect(() => {
        const eventBox = eventBoxRef.current
        if (!eventBox) return
        const tl = gsap.timeline()
        if (lastAction === 'zoom' || lastAction === 'scroll') {
             if (event.animation === 'fadeIn') {
                tl.fromTo(eventBox, {opacity: 0}, {opacity: 1, duration: 0.5, ease: 'ease-in-out'})
            } else if (event.animation === 'fadeOut') {
                tl.fromTo(eventBox, {opacity: 1}, {opacity: 0, duration: 0.5, ease: 'ease-in-out'})
            } else if (event.animation === 'move') {
                tl.fromTo(eventBox, {y: event.distance}, {y: '0', duration: 0.5, ease: 'ease-in-out'})
            } else if (event.animation === ('none' || 'blank')){
                return
            } else {
                console.error('invalid event animation: ', event)
            }
        }
        tl.play()
        return ()=> {tl.kill()}
    });
    return (
        <div ref={eventBoxRef} className={`eventBox relative flex pt-[6px] flex-shrink-0 ${paddingBottom}`} style={{zIndex: zIndex}}>
            <EventNode />
            <EventList event={event}/>
        </div>
    )
}
export default EventBox