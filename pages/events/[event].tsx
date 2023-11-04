import {useSelector} from "react-redux";
import {storeWrapper} from "@/store/store";
import events from "@/public/events";
import {selectCurrentEvent, updateCurrentEvent} from "@/store/slices/eventsSlice";
import api from "@/utils/api"

// refactoring: needed (events to API fetching)

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async (context) => {
    try {
        const event = events.find(e => e.id === Number(context.query.event))
        store.dispatch(updateCurrentEvent(event))
        return {props: {}}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
})

export const getServerSidePropsTest = storeWrapper.getServerSideProps((store) => async (context) => {
    try {
        const response = await api.post('/v1/getEvent', {'eventId': Number(context.query.event)})
        const newCurrentEvent = response.data.event
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
                    <h1 className={'text-2xl font-black'}>{currentEvent.title}</h1>
                    <p>{currentEvent.content}</p>
                </div>
                <div className={'flex flex-col gap-2.5'}>
                    <h2 className={'text-lg font-semibold'}>연관된 타임라인</h2>
                    <div className={'flex gap-2.5 text-gray-500'}>
                        {currentEvent.tag}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default eventPage