import {useSelector} from "react-redux";
import Link from "next/link";
import {storeWrapper} from "@/store/store";
import {selectCurrentEvent, updateCurrentEvent} from "@/store/slices/eventsSlice";
import api from "@/utils/api"

// refactoring: needed (events to API fetching)

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async (context) => {
    try {
        const response = await api.post('/v1/getEvent', {'eventId': Number(context.query.event)})
        let newCurrentEvent = response.data.data.event
        store.dispatch(updateCurrentEvent(newCurrentEvent))
        return {props: {}}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
})

const eventPage = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div className={'page'}>
            <div className={'mt-5 mb-5 z-40 flex flex-col gap-10'}>
                <div className={'flex flex-col gap-2.5'}>
                    <h1 className={'text-2xl font-black'}>{currentEvent.name}</h1>
                    <p>{currentEvent.description}</p>
                </div>
                <div className={'flex flex-col gap-2.5'}>
                    <h2 className={'text-lg font-semibold'}>연관된 타임라인</h2>
                    <div className={'flex gap-2.5 text-gray-500'}>
                        {currentEvent.timelineInfo?.map((tI, i) => <Link key={i} href={`/timelines/${tI.id}`}>#{tI.name}</Link>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default eventPage