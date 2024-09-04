import probe from "probe-image-size";
import React from 'react';
import api from "@/pages/api/api";
import {storeWrapper} from "@/store/store";
import {updateTimelineType} from "@/store/slices/appearanceSlice";
import {updateCurrentEvents, updateCurrentTimeline, updateCurrentTimelineDraft, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import AboutSectionPrimary from "@/components/about/aboutSectionPrimary";
import AboutSectionSecondary from "@/components/about/aboutSectionSecondary";

export const getStaticProps = storeWrapper.getStaticProps((store) => async () => {
    try {
        const response = await api.get(`/timeline/tags/1?pageNum=1&pageSize=10`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) return { notFound: true }
        const staffPicks = response.data.data.timelineList
        // const data: any = {events: [{id: 0, date: getTodayDate(), name: 'Visit to Timeline', description: `In ${formatDate(getTodayDate())}, you've visited Timeline and played around with this demo timeline.`, keynote: 1}], timelineInfo: {id: 0, name: "Timeline", description: 'Wiki service that supports creating and sharing timeline', content: "Timeline is the best service when dealing with timelines. It serves effortless timeline making tool and easy wiki system.", image: 'https://cdn.timeline.vg/base-image.png'},}
        const data: any = {
            events: [
                {id: 0, date: '2024-09-07', ephemerisTime: 778939269.1825322, title: 'Timeline becomes timeline wiki', content: `In September 07, 2024, our major update ends. After the update, we will be serving timeline wiki.`, isKeynote: 1},
                {id: 1, date: '2024-09-01', ephemerisTime: 778420869.1826185, title: 'Event excluded from the keynote', content: `This event is not as important as the event below. Thus, it is excluded from the keynote. You can include it into the keynote in event edit mode.`, isKeynote: 0}
            ],
            timelineInfo: {id: 0, title: "Timeline", description: 'Wiki service that supports creating and sharing timeline', content: "Timeline is the best service when dealing with timelines. It serves effortless timeline making tool and easy wiki system.", imagePath: '/base-image.png', cdnUrl: 'cdn.timeline.vg'}
        }
        data.timelineInfo.imageSize = await probe("https://" + data.timelineInfo.cdnUrl + data.timelineInfo.imagePath)

        store.dispatch(updateCurrentTimelines(staffPicks))
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateTimelineType('demo'))
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
