import React from "react";
import probe from "probe-image-size"
import api from "@/pages/api/api"
import {storeWrapper} from "@/store/store";
import {updateCurrentEvents, updateCurrentTimeline, updatePopularTimelines, updateRecentTimelines, updateRelatedNews, updateRelatedTimelines} from "@/store/slices/contentsSlice"
import {updateCurrentPage, updateIs404, updateIsBottomEnd, updateIsSummary, updateTotalPage} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timelines/timelineSectionSecondary";
import AdsTimelineTop from "@/components/ads/adsTimelineTop";
import TimelineModal from "@/components/timelines/timelineModal/timelineModal";

export const getStaticPaths = async () => {
    return {paths: [], fallback: 'blocking'}
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const response = await api.get(`/timeline/${Number(params?.timeline)}/paged?pageNum=1&pageSize=41&isSummary=true`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) store.dispatch(updateIs404(true))
        const data = response.data.data
        data.timelineInfo.imageSize = await probe(data.timelineInfo.image)
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateRelatedTimelines(data.relatedTimelines))
        store.dispatch(updateRecentTimelines(data.recentTimelines))
        store.dispatch(updatePopularTimelines(data.popularTimelines))
        store.dispatch(updateRelatedNews(data.relatedNews))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateIsSummary(true))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(data.totalPages))
        store.dispatch(updateIsBottomEnd(data.totalPages === 1))
        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}, revalidate: 10}
    }
})

const TimelinePage = () => {
    return (
        <>
            <DynamicHead type={'timeline'}/>
            <div className={`page timelinePage`}>
                <AdsTimelineTop />
                <hr/>
                <div className={'timelinePageWrapper w-full flex'}>
                    <TimelineSectionPrimary />
                    <TimelineSectionSecondary />
                </div>
            </div>
        </>
    )
}
export default TimelinePage