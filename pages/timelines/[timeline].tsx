import Timeline from "@/components/timeline/timeline";
import {RefObject, useEffect, useRef} from "react";
import events, {initialEvents, TimelineEvent} from "@/public/events";
import {persistor, storeWrapper} from "@/store/store";
import {saveStateToSessionStorage} from "@/store/action";
import {
    updateCurrentEvents,
    updateCurrentEventsWithEffect, updateData,
    updatePrevEventsWithEffect
} from "@/store/slices/eventsSlice";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async() => {
    try {
        store.dispatch(updateCurrentEvents(initialEvents))
        store.dispatch(updateCurrentEventsWithEffect(initialEvents))
        store.dispatch(updateData(events))
        return {props: {}}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
})

const TimelinePage = ({data, initialData}:{data:TimelineEvent[], initialData: TimelineEvent[]}) => {
    const scrollRef: RefObject<HTMLDivElement> = useRef(null)

    return (
        <div ref={scrollRef} className={'page'}>
            <Timeline data={data} initialData={initialData} scrollRef={scrollRef}/>
        </div>
    )
}

export default TimelinePage