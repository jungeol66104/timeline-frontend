import probe from "probe-image-size";
import React from 'react';
import Link from "next/link";
import {storeWrapper} from "@/store/store";
import {updateIsMaintenance, updateTimelineType} from "@/store/slices/appearanceSlice";
import {updateCurrentEvents, updateCurrentTimeline, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import TimelineDemo from "@/components/about/timelineDemo";
import DynamicHead from "@/components/dynamicHead";

export const getStaticProps = storeWrapper.getStaticProps((store) => async () => {
    try {
        const data: any = {
            events: [
                {id: 0, date: '2024-09-14', ephemerisTime: 779544069.182451, title: 'Timeline becomes timeline wiki', content: `In September 14, 2024, our major update ends. After the update, we will be serving timeline wiki.`, isKeynote: 1, imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/", contributors: {counts: 1, userId: 0, username: 'you', imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/"}},
                {id: 1, date: '2024-09-01', ephemerisTime: 778420869.1826185, title: 'Event excluded from the keynote', content: `This event is not as important as the event below. Thus, it is excluded from the keynote. You can include it into the keynote in event edit mode.`, isKeynote: 0, imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/", contributors: {counts: 1, userId: 0, username: 'you', imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/"}}
            ],
            timelineInfo: {id: 0, title: "Timeline", description: 'Wiki service that supports creating and sharing timeline', content: "Timeline is the best service when dealing with timelines. It serves effortless timeline making tool and easy wiki system.", imagePath: 'base-image.png', cdnUrl: 'https://cdn.timeline.vg/', updatedDT: 'September 10, 2024', contributors: {counts: 1, userId: 0, username: 'you', imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/"}}
        }
        data.timelineInfo.imageSize = await probe(data.timelineInfo.cdnUrl + data.timelineInfo.imagePath);

        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateTimelineType('demo'))
        store.dispatch(updateIsMaintenance(true))
        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSG:', error);
        return {props: {}, revalidate: 10}
    }
})

const MaintenancePage = () => {
    return (
        <>
            <DynamicHead type={'maintenance'}/>
            <div className={'px-3 py-10 flex flex-col items-center justify-center gap-10'}>
                <div className={'text-2xl font-black'}>Timeline</div>
                <h1 className={'text-4xl font-bold text-center'}>Timeline Wiki Update</h1>
                <div className={'max-w-[630px] flex flex-col items-center gap-10 text-lg font-medium'}>
                    <p>Thank you for visiting Timeline! We&apos;ll be right back.</p>
                    <p className={'text-center'}>We expect to be back online before<br/><span className={'text-blue-700 text-[16px] font-normal'}>September 14, 2024 00:00:00 (UTC)</span></p>
                    <p>
                        Timeline is currently undergoing major update to bring you an even better experience.
                        After this update, our service becomes a timeline wiki.
                        Not only viewing timelines, you will be able to create and edit your own private timeline, publish it to the wiki or do both.
                    </p>
                    <p>You can try creating and editing your own timeline with the demo below!</p>
                </div>
                <div className={'w-full max-w-[630px]'}><TimelineDemo/></div>
                <p>Reach out to us at <Link href="mailto:project.yaha@gmail.com" className={'text-blue-700 hover:underline'}>project.yaha@gmail.com</Link>.</p>
            </div>
        </>
    );
};

export default MaintenancePage;