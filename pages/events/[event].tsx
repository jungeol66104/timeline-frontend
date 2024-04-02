import api from "@/utils/api"
import React from "react";
import {storeWrapper} from "@/store/store";
import {updateCurrentEvent} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import Event from "@/components/event/event"
import RelatedTimeline from "@/components/event/relatedTimeline";
import {updateIs404} from "@/store/slices/appearanceSlice";

export const getStaticPaths = async () => {
    const response = await api.get('/event', {headers: {lang: 'en'}})
    const events: any[] = response.data.data.slice(0, 1)
    const eventIds = events.map(event => event.id)
    const paths = eventIds.map(eventId => ({ params: {event: String(eventId) }}))
    return {paths, fallback: 'blocking'}
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
                <div className={'w-full max-w-[670px] mt-5 mb-5 z-40 flex flex-col gap-10 px-[20px]'}>
                    <Event />
                    <RelatedTimeline />
                </div>
            </div>
        </>
    )
}
export default EventPage
