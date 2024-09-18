import probe from "probe-image-size";
import React from 'react';
import api from "@/pages/api/api";
import {storeWrapper} from "@/store/store";
import {updateTimelineType} from "@/store/slices/appearanceSlice";
import {updateCurrentEvents, updateCurrentTimeline, updateCurrentTimelineDraft, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import AboutSectionPrimary from "@/components/about/aboutSectionPrimary";
import AboutSectionSecondary from "@/components/about/aboutSectionSecondary";
import {formatDate, getTodayDate} from "@/utils/global";
import {updateSession} from "@/store/slices/privateSlice";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({ req }) => {
    try {
        const jwt = req.cookies.timeline_jwt
        if (jwt) {
            const response = await api.get(`/user/info`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            if (response.data.code === 69999) return { notFound: true }
            const data = response.data.data

            store.dispatch(updateSession(data))
        }

        const response = await api.get(`/timeline/tags/1?pageNum=1&pageSize=10`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) return { notFound: true }
        const staffPicks = response.data.data.timelineList
        const data: any = {
            events: [
                {id: 0, date: '2024-09-07', ephemerisTime: 778939269.1825322, title: 'Timeline becomes timeline wiki', content: `In September 07, 2024, our major update ends. After the update, we will be serving timeline wiki.`, isKeynote: 1, updatedDT: formatDate(getTodayDate()),  imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/", contributors: {counts: 1, userId: 0, username: 'you', imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/"}},
                {id: 1, date: '2024-09-01', ephemerisTime: 778420869.1826185, title: 'Event excluded from the keynote', content: `This event is not as important as the event below. Thus, it is excluded from the keynote. You can include it into the keynote in event edit mode.`, isKeynote: 0, updatedDT: formatDate(getTodayDate()),  imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/", contributors: {counts: 1, userId: 0, username: 'you', imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/"}}
            ],
            timelineInfo: {id: 0, title: "Timeline", description: 'Wiki service that supports creating and sharing timeline', content: "Timeline is the best service when dealing with timelines. It serves effortless timeline making tool and easy wiki system.", imagePath: 'base-image.png', cdnUrl: 'https://cdn.timeline.vg/', updatedDT: formatDate(getTodayDate()), contributors: {counts: 1, userId: 0, username: 'you', imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/"}}
        }
        data.timelineInfo.imageSize = await probe(data.timelineInfo.cdnUrl + data.timelineInfo.imagePath)

        store.dispatch(updateCurrentTimelines(staffPicks))
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateTimelineType('demo'))
    } catch (error) {console.error('Error fetching initial data during SSR:', error)}
    return {props: {}}
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
