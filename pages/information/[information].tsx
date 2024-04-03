import React from "react";
import api from "@/utils/api"
import {storeWrapper} from "@/store/store";
import {selectCurrentTimeline, TimelineEvent, updateCurrentSerieses} from "@/store/slices/contentsSlice"
import {updateCurrentEvents, updateCurrentEventsWithEffect, updateCurrentTimeline} from "@/store/slices/contentsSlice";
import {updateIsTopEnd, updateIsBottomEnd, updateMaxDepth, updateIs404} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import Timeline from "@/components/timeline/timeline";
import Toolbar from "@/components/timeline/toolbar";
import {useScrollForTimeline} from "@/hooks/useScroll";
import TimelineSectionPrimary from "@/components/timeline/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timeline/timelineSectionSecondary";
import {useSelector} from "react-redux";
import Image from "next/image";
import Link from "next/link";
import TimelineImage from "@/components/timelineImage";
import TimelineListRelated from "@/components/timeline/timelineListRelated";

export const getStaticPaths = async () => {
    const response = await api.get('/timeline', {headers: {lang: 'en'}})
    const timelines: any[] = response.data.data.slice(0, 1)
    const timelineIds = timelines.map(timeline => timeline.id)
    const paths = timelineIds.map(timelineId => ({ params: {information: String(timelineId)}}))
    return {paths, fallback: 'blocking'}
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const response = await api.get(`/timeline/${Number(params?.information)}?timelineId=${Number(params?.information)}&depth=0&time=0`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) store.dispatch(updateIs404(true))
        const newCurrentTimeline = response.data.data.timelineInfo
        const newMaxDepth = response.data.data.maxDepth
        const newIsTopEnd = response.data.data.isTopEnd
        const newIsBottomEnd = response.data.data.isBottomEnd
        let newCurrentEvents = response.data.data.events as TimelineEvent[]
        newCurrentEvents = newCurrentEvents.map(cEvent => {
            return {...cEvent, isToggle: false, toggleEvents: [], animation: 'none'}
        })
        store.dispatch(updateCurrentTimeline(newCurrentTimeline))
        store.dispatch(updateMaxDepth(newMaxDepth))
        store.dispatch(updateIsTopEnd(newIsTopEnd))
        store.dispatch(updateIsBottomEnd(newIsBottomEnd))
        store.dispatch(updateCurrentEvents(newCurrentEvents))
        store.dispatch(updateCurrentEventsWithEffect(newCurrentEvents))

        const responseTemporary = await api.get('/series', {headers: {lang: 'en'}})
        let series = responseTemporary.data.data
        store.dispatch(updateCurrentSerieses(series))

        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}, revalidate: 10}
    }
})

const InformationPage = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'page informationPage'}>
            <div className={'h-full w-full max-w-[600px] p-4'}>
                <div className={'flex flex-col gap-2.5'}>
                    <div className={'relative flex flex-col items-center gap-5'}>
                        <TimelineImage timeline={currentTimeline} size={190} />
                        <div className={'flex flex-col items-center'}>
                            <h1 className={'text-2xl font-bold'}>{currentTimeline.name}</h1>
                            <div className={'text-md text-gray-500'}>{currentTimeline.description}</div>
                            <div className={'mt-1 text-gray-500 font-medium text-sm'}><span>by Timeline · January 14, 2024</span></div>
                        </div>
                    </div>
                    <div className={''}>
                        <p className={`text-md`}>
                            Muhammad bin Salman, born in 1985, is a prominent Saudi Arabian royal and politician,
                            known for his ambitious reform agenda and his role as Crown Prince since 2017.
                            <br/><br/>He has spearheaded the Vision 2030 program aimed at diversifying the Saudi
                            economy and modernizing society.
                            <br/><br/>While praised for his efforts, he has also faced criticism for alleged human
                            rights abuses and his involvement in controversial incidents, such as the murder of
                            journalist Jamal Khashoggi in 2018.
                            <br/><br/>Nonetheless, he remains a significant figure both domestically and
                            internationally, shaping Saudi Arabia&apos;s future trajectory and its relations with
                            the global community.
                        </p>
                    </div>
                </div>
                <TimelineListRelated />
            </div>
        </div>
    )
}
export default InformationPage