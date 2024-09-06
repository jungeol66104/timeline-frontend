import React from 'react';
import {storeWrapper} from "@/store/store";
import api from "@/pages/api/api";
import probe from "probe-image-size";
import {updateCurrentEvent, updateCurrentEvents, updateCurrentTimeline, updateCurrentTimelineDraft, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import {updateCurrentPage, updateEventContentType, updateInformationContentType, updateIsBottomEnd, updateIsMaintenance, updateTimelineType, updateTotalPage} from "@/store/slices/appearanceSlice";
import TimelineDemo from "@/components/about/timelineDemo";
import Link from "next/link";

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const data: any = {
            events: [
                {id: 0, date: '2024-09-10', ephemerisTime: 779198469.1824948, name: 'Timeline becomes timeline wiki', description: `In September 10, 2024, our major update ends. After the update, we will be serving timeline wiki.`, keynote: 1},
                {id: 1, date: '2024-09-01', ephemerisTime: 778420869.1826185, name: 'Event excluded from the keynote', description: `This event is not as important as the event below. Thus, it is excluded from the keynote. You can include it into the keynote in event edit mode.`, keynote: 0}
            ],
            timelineInfo: {id: 0, name: "Timeline", description: 'Wiki service that supports creating and sharing timeline', content: "Timeline is the best service when dealing with timelines. It serves effortless timeline making tool and easy wiki system.", image: 'https://cdn.timeline.vg/base-image.png'}
        }
        data.timelineInfo.imageSize = await probe(data.timelineInfo.image)
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateCurrentEvent(data.events[0]))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(1))
        store.dispatch(updateIsBottomEnd(true))
        store.dispatch(updateTimelineType('demo'))
        store.dispatch(updateInformationContentType('view'))
        store.dispatch(updateEventContentType('view'))
        store.dispatch(updateIsMaintenance(true))
        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}, revalidate: 10}
    }
})

const MaintenancePage = () => {
    return (
        <div className={'px-3 py-10 flex flex-col items-center justify-center gap-10'}>
            <div className={'text-2xl font-black'}>Timeline</div>
            <h1 className={'text-4xl font-bold text-center'}>Timeline Wiki Update</h1>
            <div className={'max-w-[630px] flex flex-col items-center gap-10 text-lg font-medium'}>
                <p>Thank you for visiting Timeline! We&apos;ll be right back.</p>
                <p className={'text-center'}>We expect to be back online before<br/><span className={'text-blue-700 text-[16px] font-normal'}>September 10, 2024 00:00:00 (UTC)</span></p>
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
    );
};

export default MaintenancePage;
