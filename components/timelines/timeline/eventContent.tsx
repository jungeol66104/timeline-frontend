import {useDispatch, useSelector} from "react-redux";
import {TimelineEvent, updateCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {selectTimelineContentType, updateModalType} from "@/store/slices/appearanceSlice";
import KeynoteToggle from "@/components/timelines/timeline/keynoteToggle";
import DetachButton from "@/components/timelines/timeline/detachButton";
import EventContentImage from "@/components/timelines/timeline/eventContentImage";
import {getIsBaseImage} from "@/utils/global";
import api from "@/pages/api/api";

const EventContent = ({event} : {event: TimelineEvent}) => {
    const dispatch = useDispatch()
    const timelineContentType = useSelector(selectTimelineContentType)
    const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'
    const isBaseImage = getIsBaseImage(event.image)

    const handleClick = async () => {
        try {
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
            <div className={`${!isTimelineEditable && 'hidden'}`}>
                <div className={`p-2.5 flex items-center justify-between`}>
                    <KeynoteToggle event={event} />
                    <DetachButton event={event} />
                </div>
                <hr />
            </div>
            <div onClick={handleClick} className={`cursor-pointer p-2.5 min-h-[112px] flex flex-col bg-white rounded-xl`}>
                <div className={'text-xs font-semibold text-gray-500 line-clamp-1 text-ellipsis'}>{event.date}</div>
                <div className={'mt-0.5 text-md font-bold'}>{event.name}</div>
                <div className={'mt-1 flex justify-between gap-1'}>
                    <div className={`text-sm whitespace-pre-wrap break-words ${isBaseImage ? 'line-clamp-3' : 'line-clamp-4'}`}>{event.description}</div>
                    <EventContentImage src={event.image} alt={event.name} />
                </div>
            </div>
        </div>
    )
}

export default EventContent;
