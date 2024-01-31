import api from "@/utils/api"
import React from "react";
import {storeWrapper} from "@/store/store";
import {updateCurrentEvent} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import Event from "@/components/event/event"
import RelatedTimeline from "@/components/event/relatedTimeline";
// refactoring: clear


export const getStaticPaths = async () => {
    const eventIds = Array.from({length: 966}, (_, index) => index + 1)
    const paths = eventIds.map(eventId => ({ params: {event: String(eventId) }}))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({params}) => {
    try {
        const response = await api.get(`/event/${Number(params?.event)}`, {headers: {lang: 'en'}})
        let newCurrentEvent = response.data.data
        store.dispatch(updateCurrentEvent(newCurrentEvent))
        return {props: {}, revalidate: 10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
})

const EventPage = () => {
    return (
        <>
            <DynamicHead type={'event'}/>
            <div className={'page'}>
                <div className={'mt-5 mb-5 z-40 flex flex-col gap-10 mx-[20px]'}>
                    <Event />
                    <RelatedTimeline />
                </div>
            </div>
        </>
    )
}
export default EventPage
