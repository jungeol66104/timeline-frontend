import {useDispatch} from "react-redux";
import {updateCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {updateModalContentType, updateModalType} from "@/store/slices/appearanceSlice";
import {getTodayDate} from "@/utils/global";

const AddEventButton = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        const newEvent = {id: 0, name: 'New Event Title', description: 'New event description.', date: getTodayDate(), ephemerisTime: 0, keynote: 1, timelineInfo: [], updatedDt: getTodayDate()}
        dispatch(updateCurrentEvent(newEvent))
        dispatch(updateCurrentEventDraft(newEvent))
        dispatch(updateModalContentType('new'))
        dispatch(updateModalType('event'))
    }

    return (
        <button onClick={handleClick} className={`pl-1.5 pr-2.5 flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
            <div className={'material-symbols-outlined text-[20px]'}>&#xe145;</div>
            <div className={'text-sm font-semibold'}>Add Event</div>
        </button>
    )
}

export default AddEventButton;
