import React from 'react';
import probe from "probe-image-size";
import {storeWrapper} from "@/store/store";
import {updateCurrentPage, updateIsBottomEnd, updateIsSummary, updateTimelineContentType, updateTimelineType, updateTotalPage} from "@/store/slices/appearanceSlice";
import {updateCurrentEvents, updateCurrentEventsDraft, updateCurrentTimeline, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import AboutSectionPrimary from "@/components/about/aboutSectionPrimary";
import AboutSectionSecondary from "@/components/about/aboutSectionSecondary";

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const data: any = {events: [{}], timelineInfo: {id: 0, name: "Timeline", description: 'Wiki service that supports creating and sharing timeline', content: "Timeline is the best service when dealing with timelines. It serves effortless timeline making tool and easy wiki system.", image: 'https://cdn.timeline.vg/base-image.png'},}
        data.timelineInfo.imageSize = await probe(data.timelineInfo.image)
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateCurrentEventsDraft(data.events))
        store.dispatch(updateIsSummary(false))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(1))
        store.dispatch(updateIsBottomEnd(true))
        store.dispatch(updateTimelineType('demo'))
        store.dispatch(updateTimelineContentType('view'))
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
