import React from 'react';
import DynamicHead from "@/components/dynamicHead";
import AboutSectionPrimary from "@/components/about/aboutSectionPrimary";
import AboutSectionSecondary from "@/components/about/aboutSectionSecondary";
import {storeWrapper} from "@/store/store";
import api from "@/pages/api/api";
import {updateCurrentPage, updateIs404, updateIsBottomEnd, updateIsSummary, updateTimelineContentType, updateTotalPage} from "@/store/slices/appearanceSlice";
import probe from "probe-image-size";
import {updateCurrentEvents, updateCurrentEventsDraft, updateCurrentTimeline, updateCurrentTimelineDraft, updatePopularTimelines, updateRecentTimelines} from "@/store/slices/contentsSlice";

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const data: any = {events: [{}], timelineInfo: {id: 0, name: "", description: '', content: "", image: 'https://cdn.timeline.vg/base-image.png'},}
        data.timelineInfo.imageSize = await probe(data.timelineInfo.image)
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateCurrentEventsDraft(data.events))
        store.dispatch(updateIsSummary(false))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(1))
        store.dispatch(updateIsBottomEnd(true))
        store.dispatch(updateTimelineContentType('new'))
        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}, revalidate: 10}
    }
})

const AboutPage = () => {
    return (
        <>
            <DynamicHead type={'timeline'}/>
            <div className={`page`}>
                <div className={'timelinePageWrapper pageWrapper w-full flex'}>
                    <AboutSectionPrimary />
                    <AboutSectionSecondary />
                </div>
            </div>
        </>
    );
};

export default AboutPage;
