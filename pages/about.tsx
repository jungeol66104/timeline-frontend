import React from 'react';
import probe from "probe-image-size";
import {storeWrapper} from "@/store/store";
import {updateCurrentPage, updateIs404, updateIsBottomEnd, updateInformationContentType, updateTimelineType, updateTotalPage} from "@/store/slices/appearanceSlice";
import {updateCurrentEvent, updateCurrentEvents, updateCurrentEventsDraft, updateCurrentTimeline, updateCurrentTimelineDraft, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import AboutSectionPrimary from "@/components/about/aboutSectionPrimary";
import AboutSectionSecondary from "@/components/about/aboutSectionSecondary";
import {formatDate, getTodayDate} from "@/utils/global";
import api from "@/pages/api/api";

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const timelinesResponse = await api.get(`/timeline/tags/1?pageNum=1&pageSize=10`, {headers: {lang: 'en'}})
        if (timelinesResponse.data.code === 69999) store.dispatch(updateIs404(true))
        const staffPicks = timelinesResponse.data.data.timelineList
        const data: any = {events: [{id: 0, date: getTodayDate(), name: 'Visit to Timeline', description: `In ${formatDate(getTodayDate())}, you've visited Timeline and played around with this demo timeline.`, keynote: 1}], timelineInfo: {id: 0, name: "Timeline", description: 'Wiki service that supports creating and sharing timeline', content: "Timeline is the best service when dealing with timelines. It serves effortless timeline making tool and easy wiki system.", image: 'https://cdn.timeline.vg/base-image.png'},}
        data.timelineInfo.imageSize = await probe(data.timelineInfo.image)
        store.dispatch(updateCurrentTimelines(staffPicks))
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateCurrentEvent(data.events[0]))
        store.dispatch(updateCurrentEventsDraft(data.events))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(1))
        store.dispatch(updateIsBottomEnd(true))
        store.dispatch(updateTimelineType('demo'))
        store.dispatch(updateInformationContentType('view'))
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
