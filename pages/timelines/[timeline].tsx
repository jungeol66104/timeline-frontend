import {storeWrapper} from "@/store/store";
import {sum, getEventHeights} from "@/utils/global";
import events, {initialEvents} from "@/public/events";
import {updateCurrentEvents, updateCurrentEventsWithEffect, updateData} from "@/store/slices/eventsSlice";
import {updateTotalHeight} from "@/store/slices/effectsSlice";
import Timeline from "@/components/timeline/timeline";
// refactoring: needed (events to API fetching)

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async () => {
    try {
        const initialTotalHeight = sum(getEventHeights(initialEvents))
        store.dispatch(updateCurrentEvents(initialEvents))
        store.dispatch(updateCurrentEventsWithEffect(initialEvents))
        store.dispatch(updateTotalHeight(initialTotalHeight))
        store.dispatch(updateData(events))
        return {props: {}}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
})

const TimelinePage = () => {
    return (
        <div className={'page'}>
            <Timeline/>
        </div>
    )
}
export default TimelinePage