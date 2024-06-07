import {TimelineEvent, updateCurrentEvent} from "@/store/slices/contentsSlice";
import api from "@/pages/api/api";
import {useDispatch} from "react-redux";
import {updateTimelineModalType} from "@/store/slices/appearanceSlice";
import {getBody} from "@/utils/global";

const EventContent = ({event} : {event: TimelineEvent}) => {
    const dispatch = useDispatch()

    const handleClick = async () => {
        try {
            const body = getBody()
            if (!body) return

            const response = await api.get(`/event/${Number(event.id)}`, {headers: {lang: 'en'}})
            const currentEvent = response.data.data
            dispatch(updateCurrentEvent(currentEvent))
            dispatch(updateTimelineModalType('event'))
            return
        } catch (error) {
            console.error('Error fetching data in useEffect: ', error)
            return
        }
    }

    return (
        <>
            <div onClick={handleClick} className={`eventContent relative w-full cursor-pointer`}>
                <div className={`flex flex-col gap-1 bg-white h-full border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5 min-h-[112px]`}>
                    <div className={'flex flex-col'}>
                        <div className={'text-xs font-semibold text-gray-500 line-clamp-1 text-ellipsis'}>{event.date}</div>
                        <div className={'mt-0.5 text-md font-bold'}>{event.name}</div>
                    </div>
                    <div className={'text-sm whitespace-pre-wrap break-words line-clamp-3'}>{event.description}</div>
                </div>
            </div>
        </>
    )
}
export default EventContent