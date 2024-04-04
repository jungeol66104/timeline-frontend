import React from "react";
import api from "@/utils/api"
import {storeWrapper} from "@/store/store";
import {TimelineEvent, updateCurrentSerieses} from "@/store/slices/contentsSlice"
import {updateCurrentEvents, updateCurrentTimeline} from "@/store/slices/contentsSlice";
import {updateIsTopEnd, updateIsBottomEnd, updateMaxDepth, updateIs404} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import Information from "@/components/information/information";
import TimelineSectionSecondary from "@/components/timeline/timelineSectionSecondary";

export const getStaticPaths = async () => {
    const response = await api.get('/timeline', {headers: {lang: 'en'}})
    const timelines: any[] = response.data.data.slice(0, 1)
    const timelineIds = timelines.map(timeline => timeline.id)
    const paths = timelineIds.map(timelineId => ({ params: {information: String(timelineId)}}))
    return {paths, fallback: 'blocking'}
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const response = await api.get(`/timeline/${Number(params?.information)}?timelineId=${Number(params?.information)}&depth=0&time=0`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) store.dispatch(updateIs404(true))
        const newCurrentTimeline = response.data.data.timelineInfo
        const newMaxDepth = response.data.data.maxDepth
        const newIsTopEnd = response.data.data.isTopEnd
        const newIsBottomEnd = response.data.data.isBottomEnd
        let newCurrentEvents = response.data.data.events as TimelineEvent[]
        store.dispatch(updateCurrentTimeline(newCurrentTimeline))
        store.dispatch(updateMaxDepth(newMaxDepth))
        store.dispatch(updateIsTopEnd(newIsTopEnd))
        store.dispatch(updateIsBottomEnd(newIsBottomEnd))
        store.dispatch(updateCurrentEvents(newCurrentEvents))

        const responseTemporary = await api.get('/series', {headers: {lang: 'en'}})
        let series = responseTemporary.data.data
        store.dispatch(updateCurrentSerieses(series))

        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}, revalidate: 10}
    }
})

const InformationPage = () => {
    return (
        <>
            <DynamicHead type={'timeline'}/>
            <div className={'page informationPage'}>
                <Information />
                {/*<TimelineSectionSecondary />*/}
            </div>
        </>
    )
}
export default InformationPage