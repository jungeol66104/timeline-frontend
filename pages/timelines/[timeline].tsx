import {storeWrapper} from "@/store/store";
import {sum, getEventHeights} from "@/utils/global";
import {TimelineEvent} from "@/public/events"
import {updateCurrentEvents, updateCurrentEventsWithEffect, updateCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectTotalHeight, updateMaxDepth, updateTotalHeight} from "@/store/slices/appearanceSlice";
import Timeline from "@/components/timeline/timeline";
import api from "@/utils/api"
import Link from "next/link";
import React from "react";
import {useSelector} from "react-redux";
// refactoring: clear

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async (context) => {
    try {
        const response = await api.post('/v1/getTimeline', {"timelineId": Number(context.query.timeline), "depth": 0, "pivotJulianDate": "0"})
        const newCurrentTimeline = response.data.data.timelineInfo
        const newMaxDepth = response.data.data.maxDepth
        let newCurrentEvents = response.data.data.events as TimelineEvent[]
        newCurrentEvents = newCurrentEvents.map(cEvent => {
            return {...cEvent, isToggle: false, toggleEvents: [], animation: 'none'}
        })
        const newTotalHeight = sum(getEventHeights(newCurrentEvents))
        store.dispatch(updateCurrentTimeline(newCurrentTimeline))
        store.dispatch(updateMaxDepth(newMaxDepth))
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
    const totalHeight = useSelector(selectTotalHeight)

    return (
        <div className={'page'}>
            <div className={'timeline absolute w-full overflow-hidden'} style={{height: totalHeight + 140, zIndex:9998}}>
                <Link href={'/'}>page</Link>
            </div>
            <Timeline/>
        </div>
    )
}
export default TimelinePage