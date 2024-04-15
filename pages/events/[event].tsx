import api from "@/utils/api"
import React from "react";
import {storeWrapper} from "@/store/store";
import {updateCurrentEvent} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import Event from "@/components/events/event"
import RelatedTimeline from "@/components/events/relatedTimeline";
import {updateIs404} from "@/store/slices/appearanceSlice";
import TimelineSectionSecondary from "@/components/timelines/timelineSectionSecondary";

export const getStaticPaths = async () => {
    return {paths: [], fallback: 'blocking'}
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({params}) => {
    try {
        const response = await api.get(`/event/${Number(params?.event)}`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) store.dispatch(updateIs404(true))
        let newCurrentEvent = response.data.data
        store.dispatch(updateCurrentEvent(newCurrentEvent))
        return {props: {}, revalidate: 10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}, revalidate: 10}
    }
})

const EventPage = () => {
    return (
        <>
            <DynamicHead type={'event'}/>
            <div className={'page eventPage'}>
                <div className={'w-full max-w-[600px] p-4 flex flex-col gap-10'}>
                    <Event />
                    <RelatedTimeline />
                </div>
                {/*<TimelineSectionSecondary />*/}
            </div>
        </>
    )
}
export default EventPage
