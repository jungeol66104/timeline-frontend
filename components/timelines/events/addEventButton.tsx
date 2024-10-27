import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectTimelineType, updateEventContentType, updateModalType, updatePopupType} from "@/store/slices/appearanceSlice";
import {selectCurrentEvents, updateCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {selectSession} from "@/store/slices/privateSlice";
import {getTodayDate} from "@/utils/global";

const AddEventButton = ({type}: {type: string}) => {
    const dispatch = useDispatch()
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept)
    const currentEvents = useSelector(selectCurrentEvents)

    const isSession = Object.keys(session).length !== 0

    const handleClick = () => {
        const getNewId = () => {
            const negativeIds = currentEvents.map(event => event.id).filter(id => id < 0)
            const mostNegativeId = Math.min(...negativeIds)
            return mostNegativeId === Infinity ? -1 : mostNegativeId - 1
        }
        let newEvent = {id: getNewId(), title: '', content: '', date: '', ephemerisTime: 0, isKeynote: 1, timelineInfo: [], createdDt: getTodayDate(), imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/", contributors: {counts: 1, userId: 0, username: 'you', imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/"}}

        if (isSession || timelineType === 'demo') {
            dispatch(updateCurrentEvent(newEvent))
            dispatch(updateCurrentEventDraft(newEvent))
            dispatch(updateModalType('event'))
            dispatch(updateEventContentType('new'))
        } else dispatch(updatePopupType('signIn'))
    }

    return (
        <>
            {type === 'events' &&
                <button onClick={handleClick} className={`pl-1.5 pr-2.5 flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md ${timelineType === 'demo' && demoKeyConcept === 'edit' && 'outline outline-2 outline-blue-700'}`}>
                    <div className={'material-symbols-outlined text-[20px]'}>&#xe145;</div>
                    <div className={'text-sm font-semibold'}>Add Event</div>
                </button>
            }
            {type === 'toolbar' &&
                <button onClick={handleClick} className={'w-[40px] h-[40px] flex items-center justify-center border-[0.1px] border-gray-300 rounded-lg bg-white hover:bg-gray-100 drop-shadow-md'}>
                    <div className={'material-symbols-outlined text-[23px]'}>&#xe145;</div>
                </button>
            }
        </>
    )
}

export default AddEventButton;
