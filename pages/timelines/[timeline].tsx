import Head from 'next/head'
import {storeWrapper} from "@/store/store";
import {sum, getEventHeights} from "@/utils/global";
import {selectCurrentTimeline, TimelineEvent} from "@/store/slices/contentsSlice"
import {updateCurrentEvents, updateCurrentEventsWithEffect, updateCurrentTimeline} from "@/store/slices/contentsSlice";
import {updateIsTopEnd, updateIsBottomEnd, updateMaxDepth, updateTotalHeight} from "@/store/slices/appearanceSlice";
import Timeline from "@/components/timeline/timeline";
import api from "@/utils/api"
import React from "react";
import ToolbarExpanded from "@/components/timelineToolbar/toolbarExpanded";
import ToolbarShrunk from "@/components/timelineToolbar/toolbarShrunk";
import {useSelector} from "react-redux";
// refactoring: clear

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async (context) => {
    try {
        const response = await api.post('/v1/getTimeline', {"timelineId": Number(context.query.timeline), "depth": 0, "pivotJulianDate": "0"})
        const newCurrentTimeline = response.data.data.timelineInfo
        const newMaxDepth = response.data.data.maxDepth
        const newIsTopEnd = response.data.data.isTopEnd
        const newIsBottomEnd = response.data.data.isBottomEnd
        let newCurrentEvents = response.data.data.events as TimelineEvent[]
        newCurrentEvents = newCurrentEvents.map(cEvent => {
            return {...cEvent, isToggle: false, toggleEvents: [], animation: 'none'}
        })
        const newTotalHeight = sum(getEventHeights(newCurrentEvents))
        store.dispatch(updateCurrentTimeline(newCurrentTimeline))
        store.dispatch(updateMaxDepth(newMaxDepth))
        store.dispatch(updateIsTopEnd(newIsTopEnd))
        store.dispatch(updateIsBottomEnd(newIsBottomEnd))
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
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <>
            <Head>
                <title>{currentTimeline.name} | Timeline</title>
                <meta name="description" content={currentTimeline.name} />
            </Head>
            <div className={'page'}>
                <Timeline/>
                <ToolbarExpanded />
                {/*<ToolbarShrunk />*/}
            </div>
        </>
    )
}
export default TimelinePage