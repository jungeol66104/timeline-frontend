import api from "@/utils/api"
import React from "react";
import {useSelector} from "react-redux";
import {storeWrapper} from "@/store/store";
import {selectCurrentEvent, updateCurrentEvent} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import Event from "@/components/event/event"
import RelatedTimeline from "@/components/event/relatedTimeline";
// refactoring: clear


// export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({params}) => {
//     try {
//         const response = await api.post('/v1/getEvent', {'eventId': Number(params?.event)})
//         let newCurrentEvent = response.data.data.event
//         store.dispatch(updateCurrentEvent(newCurrentEvent))
//         return {props: {}}
//     } catch (error) {
//         console.error('Error fetching initial data during SSR:', error);
//         return {props: {}}
//     }
// })


export const getStaticPaths = async () => {
    const eventIds = Array.from({length: 924}, (_, index) => index + 1)
    const paths = eventIds.map(eventId => ({ params: {event: String(eventId) }}))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({params}) => {
    try {
        const response = await api.post('/v1/getEvent', {'eventId': Number(params?.event)})
        let newCurrentEvent = response.data.data.event
        store.dispatch(updateCurrentEvent(newCurrentEvent))
        return {props: {}, revalidate: 10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
})

const EventPage = () => {
    const currentEvent = useSelector(selectCurrentEvent)

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
