import api from "@/utils/api"
import React from "react";
import {useSelector} from "react-redux";
import Link from "next/link";
import {storeWrapper} from "@/store/store";
import {selectCurrentEvent, updateCurrentEvent} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
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
    const eventIds = Array.from({length: 704}, (_, index) => index + 1)
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
                    <div className={'flex flex-col'}>
                        <span className={'text-md font-semibold text-gray-500'}>{currentEvent.date}</span>
                        <h1 className={'mt-1 text-2xl font-black'}>{currentEvent.name}</h1>
                        <p className={'mt-2.5'}>{currentEvent.description}</p>
                    </div>
                    <div className={'flex flex-col gap-2.5'}>
                        <h2 className={'text-lg font-semibold'}>연관된 타임라인</h2>
                        <div className={'flex gap-2.5 text-gray-500'}>
                            {currentEvent.timelineInfo?.map((tI, i) => <Link key={i} href={`/timelines/${tI.id}`}>#{tI.name}</Link>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EventPage
