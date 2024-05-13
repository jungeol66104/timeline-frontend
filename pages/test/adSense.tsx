import React from "react";
import probe from "probe-image-size"
import api from "@/utils/api"
import {storeWrapper} from "@/store/store";
import {updateCurrentEvents, updateCurrentTimeline, updatePopularTimelines, updateRecentTimelines, updateRelatedNews, updateRelatedTimelines} from "@/store/slices/contentsSlice"
import {updateIs404, updateIsBottomEnd, updateIsTopEnd, updateMaxDepth} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timelines/timelineSectionSecondary";
import AdSenseTimelineTop from "@/components/test/adSenseTimelineTop";
import SectionSecondaryTest from "@/components/test/sectionSecondaryTest";


export const getServerSideProps = storeWrapper.getStaticProps((store) => async () => {
    try {
        const response = await api.get(`/timeline/32082?timelineId=32082&depth=0&time=0`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) store.dispatch(updateIs404(true))
        const data = response.data.data
        data.timelineInfo.imageSize = await probe(data.timelineInfo.image)
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateRelatedTimelines(data.relatedTimelines))
        store.dispatch(updateRecentTimelines(data.recentTimelines))
        store.dispatch(updatePopularTimelines(data.popularTimelines))
        store.dispatch(updateRelatedNews(data.relatedNews))
        store.dispatch(updateMaxDepth(data.maxDepth))
        store.dispatch(updateIsTopEnd(data.isTopEnd))
        store.dispatch(updateIsBottomEnd(data.isBottomEnd))
        store.dispatch(updateCurrentEvents(data.events))
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
            <div className={`page flex-col`}>
                <AdSenseTimelineTop />
                <hr />
                <div className={'timelineTest relative w-full flex'}>
                    <TimelineSectionPrimary />
                    <SectionSecondaryTest />
                </div>
            </div>
        </>
    )
}
export default TimelinePage