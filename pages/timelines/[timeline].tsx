import {storeWrapper} from "@/store/store";
import {sum, getEventHeights} from "@/utils/global";
import events, {initialEvents} from "@/public/events";
import {
    updateCurrentEvents,
    updateCurrentEventsWithEffect,
    updateData,
    updateCurrentTimeline
} from "@/store/slices/eventsSlice";
import {updateTotalHeight} from "@/store/slices/effectsSlice";
import Timeline from "@/components/timeline/timeline";
import api from "@/utils/api"
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

export const getServerSidePropsTest = storeWrapper.getServerSideProps((store) => async () => {
    try {
        const response = await api.post('/v1/getTimeline', {'timelineId': 1, 'depth': 0, 'pivotJulianDate': '0'})
        const newCurrentEvents = response.data.events
        const newTotalHeight = sum(getEventHeights(newCurrentEvents))
        store.dispatch(updateCurrentTimeline({id: 1, name: '전쟁'}))
        store.dispatch(updateCurrentEvents(newCurrentEvents))
        store.dispatch(updateCurrentEventsWithEffect(newCurrentEvents))
        store.dispatch(updateTotalHeight(newTotalHeight))
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