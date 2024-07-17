import {TimelineEvent, updateCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import api from "@/pages/api/api";
import {useDispatch, useSelector} from "react-redux";
import {selectTimelineContentType, updateModalType} from "@/store/slices/appearanceSlice";
import {getBody} from "@/utils/global";
import KeynoteToggle from "@/components/timelines/timeline/keynoteToggle";
import DetachButton from "@/components/timelines/timeline/detachButton";

const EventContent = ({event} : {event: TimelineEvent}) => {
    const dispatch = useDispatch()
    const timelineContentType = useSelector(selectTimelineContentType)

    const handleClick = async () => {
        try {
            const body = getBody()
            if (!body) return

            const response = await api.get(`/event/${Number(event.id)}`, {headers: {lang: 'en'}})
            const currentEvent = response.data.data
            dispatch(updateCurrentEvent(currentEvent))
            dispatch(updateCurrentEventDraft(currentEvent))
            dispatch(updateModalType('event'))
            return
        } catch (error) {
            console.error('Error fetching data in useEffect: ', error)
            return
        }
    }

    return (
        <div className={`eventContent relative w-full border-[0.1px] border-gray-300 rounded-xl shadow-md`}>
            <div className={`${timelineContentType !== 'edit' && 'hidden'}`}>
                <div className={`p-2.5 flex items-center justify-between`}>
                    <KeynoteToggle />
                    <DetachButton />
                </div>
                <hr />
            </div>
            <div onClick={handleClick} className={`cursor-pointer p-2.5 min-h-[112px] flex flex-col gap-1 bg-white rounded-xl`}>
                <div className={'flex flex-col'}>
                    <div className={'text-xs font-semibold text-gray-500 line-clamp-1 text-ellipsis'}>{event.date}</div>
                    <div className={'mt-0.5 text-md font-bold'}>{event.name}</div>
                </div>
                <div className={'text-sm whitespace-pre-wrap break-words line-clamp-3'}>{event.description}</div>
            </div>
        </div>
    )
}
export default EventContent