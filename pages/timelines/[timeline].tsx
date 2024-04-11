import React from "react";
import probe from "probe-image-size"
import api from "@/utils/api"
import {storeWrapper} from "@/store/store";
import {updateCurrentEvents, updateCurrentTimeline, updatePopularTimelines, updateRecentTimelines, updateRelatedTimelines} from "@/store/slices/contentsSlice"
import {updateIs404, updateIsBottomEnd, updateIsTopEnd, updateMaxDepth} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timelines/timelineSectionSecondary";
import {useScrollForTimeline} from "@/hooks/useScroll";

export const getStaticPaths = async () => {
    const response = await api.get('/timeline/all?searchType=0&pageNum=1&pageSize=all', {headers: {lang: 'en'}})
    const timelines: any[] = response.data.data
    // const timelines: any[] = response.data.data.slice(0, 10)
    const timelineIds = timelines.map(timeline => timeline.id)
    const paths = timelineIds.map(timelineId => ({ params: {timeline: String(timelineId)}}))
    return {paths, fallback: 'blocking'}
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const response = await api.get(`/timeline/${Number(params?.timeline)}?timelineId=${Number(params?.timeline)}&depth=0&time=0`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) store.dispatch(updateIs404(true))
        const data = response.data.data
        data.timelineInfo.imageSize = await probe(data.timelineInfo.image)
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateRelatedTimelines(data.relatedTimelines))
        store.dispatch(updateRecentTimelines(data.recentTimelines))
        store.dispatch(updatePopularTimelines(data.popularTimelines))
        store.dispatch(updateMaxDepth(data.maxDepth))
        store.dispatch(updateIsTopEnd(data.isTopEnd))
        store.dispatch(updateIsBottomEnd(data.isBottomEnd))
        store.dispatch(updateCurrentEvents(data.events))
        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}, revalidate: 10}
    }
})

const TimelinePage = () => {
    useScrollForTimeline()

    return (
        <>
            <DynamicHead type={'timeline'}/>
            <div className={`page timelinePage`}>
                <TimelineSectionPrimary />
                <TimelineSectionSecondary />
            </div>
        </>
    )
}
export default TimelinePage