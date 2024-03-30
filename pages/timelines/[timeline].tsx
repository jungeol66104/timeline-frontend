import React from "react";
import api from "@/utils/api"
import {sum, getEventHeights} from "@/utils/global";
import {storeWrapper} from "@/store/store";
import {TimelineEvent} from "@/store/slices/contentsSlice"
import {updateCurrentEvents, updateCurrentEventsWithEffect, updateCurrentTimeline} from "@/store/slices/contentsSlice";
import {updateIsTopEnd, updateIsBottomEnd, updateMaxDepth, updateTotalHeight, updateIs404} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import Timeline from "@/components/timeline/timeline";
import Toolbar from "@/components/timeline/toolbar";
import {useScrollForTimeline} from "@/hooks/useScroll";

export const getStaticPaths = async () => {
    const response = await api.get('/timeline', {headers: {lang: 'en'}})
    const timelines: any[] = response.data.data
    // const timelines: any[] = response.data.data.slice(0, 10)
    const timelineIds = timelines.map(timeline => timeline.id)
    const paths = timelineIds.map(timelineId => ({ params: {timeline: String(timelineId)}}))
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const response = await api.get(`/timeline/${Number(params?.timeline)}?timelineId=${Number(params?.timeline)}&depth=0&time=0`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) store.dispatch(updateIs404(true))
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

        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
})

const TimelinePage = () => {
    useScrollForTimeline()

    return (
        <>
            <DynamicHead type={'timeline'}/>
            <div className={`page timelinePage`}>
                <Timeline/>
                <Toolbar />
            </div>
        </>
    )
}
export default TimelinePage