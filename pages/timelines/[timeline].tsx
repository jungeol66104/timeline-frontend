import {storeWrapper} from "@/store/store";
import {sum, getEventHeights} from "@/utils/global";
import {TimelineEvent} from "@/public/events"
import {updateCurrentEvents, updateCurrentEventsWithEffect, updateCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectViewportHeight, updateTotalHeight} from "@/store/slices/appearanceSlice";
import Timeline from "@/components/timeline/timeline";
import api from "@/utils/api"
import {useSelector} from "react-redux";
// refactoring: needed (events to API fetching)

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async (context) => {
    try {
        const response = await api.post('/v1/getTimeline', {"timelineId": Number(context.query.timeline), "depth": 0, "pivotJulianDate": "0"})
        // const newCurrentTimeline = response.data.data.timelineInfo
        let newCurrentEvents = response.data.data.events as TimelineEvent[]
        newCurrentEvents = newCurrentEvents.map(cEvent => {
            return {...cEvent, isToggle: false, toggleEvents: [], animation: 'none'}
        })
        const newTotalHeight = sum(getEventHeights(newCurrentEvents))
        store.dispatch(updateCurrentTimeline({id: context.query.timeline, name: ''}))
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