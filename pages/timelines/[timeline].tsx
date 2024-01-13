import {sum, getEventHeights} from "@/utils/global";
import api from "@/utils/api"
import React, {Suspense} from "react";
import {storeWrapper} from "@/store/store";
import {TimelineEvent} from "@/store/slices/contentsSlice"
import {updateCurrentEvents, updateCurrentEventsWithEffect, updateCurrentTimeline} from "@/store/slices/contentsSlice";
import {updateIsTopEnd, updateIsBottomEnd, updateMaxDepth, updateTotalHeight} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import Timeline from "@/components/timeline/timeline";
import ToolbarExpanded from "@/components/timelineToolbar/toolbarExpanded";
import {updateIsSearch} from "@/store/slices/searchSlice";
// refactoring: clear

export const getStaticPaths = async () => {
    const timelineIds = Array.from({length: 8}, (_, index) => index + 1)
    const paths = timelineIds.map(timelineId => ({ params: {timeline: String(timelineId) }}))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const response = await api.post('/v1/getTimeline', {"timelineId": Number(params?.timeline), "depth": 0, "pivotJulianDate": "0"})
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
    return (
        <>
            <DynamicHead type={'timeline'}/>
            <div className={'page'}>
                {/*<div className={'absolute w-[60px] h-[60px] bg-black z-[5000] left-[-20px]'}></div>*/}
                    <Timeline/>
                    <ToolbarExpanded />
                {/*<ToolbarShrunk />*/}
            </div>
        </>
    )
}
export default TimelinePage