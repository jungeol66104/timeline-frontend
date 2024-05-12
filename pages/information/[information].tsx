import React from "react";
import probe from "probe-image-size";
import api from "@/utils/api"
import {storeWrapper} from "@/store/store";
import {updateCurrentEvents, updateCurrentTimeline, updatePopularTimelines, updateRecentTimelines, updateRelatedTimelines} from "@/store/slices/contentsSlice";
import {updateIsTopEnd, updateIsBottomEnd, updateMaxDepth, updateIs404} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import Information from "@/components/information/information";
import TimelineSectionSecondary from "@/components/timelineSectionSecondary";

export const getStaticPaths = async () => {
    return {paths: [], fallback: 'blocking'}
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const response = await api.get(`/timeline/${Number(params?.information)}?timelineId=${Number(params?.information)}&depth=0&time=0`, {headers: {lang: 'en'}})
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

const InformationPage = () => {
    return (
        <>
            <DynamicHead type={'timeline'}/>
            <div className={'page informationPage'}>
                <Information />
                <TimelineSectionSecondary />
            </div>
        </>
    )
}
export default InformationPage