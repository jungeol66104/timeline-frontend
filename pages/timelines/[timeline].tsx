import React from "react";
import api from "@/utils/api"
import probe from "probe-image-size"
import {storeWrapper} from "@/store/store";
import {TimelineEvent, updateCurrentEvents, updateCurrentSerieses, updateCurrentTimeline} from "@/store/slices/contentsSlice"
import {updateIs404, updateIsBottomEnd, updateIsTopEnd, updateMaxDepth} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import {useScrollForTimeline} from "@/hooks/useScroll";
import TimelineSectionPrimary from "@/components/timeline/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timeline/timelineSectionSecondary";

export const getStaticPaths = async () => {
    const response = await api.get('/timeline', {headers: {lang: 'en'}})
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
        const currentTimeline = response.data.data.timelineInfo
        const maxDepth = response.data.data.maxDepth
        const isTopEnd = response.data.data.isTopEnd
        const isBottomEnd = response.data.data.isBottomEnd
        let currentEvents = response.data.data.events as TimelineEvent[]
        currentTimeline.imageSize = await probe(currentTimeline.image)
        store.dispatch(updateCurrentTimeline(currentTimeline))
        store.dispatch(updateMaxDepth(maxDepth))
        store.dispatch(updateIsTopEnd(isTopEnd))
        store.dispatch(updateIsBottomEnd(isBottomEnd))
        store.dispatch(updateCurrentEvents(currentEvents))

        const responseTemporary = await api.get('/series', {headers: {lang: 'en'}})
        let series = responseTemporary.data.data
        store.dispatch(updateCurrentSerieses(series))

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