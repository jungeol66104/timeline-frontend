import {useDispatch, useSelector} from "react-redux";
import {updateCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {selectDemoKeyConcept, selectTimelineType, updateEventContentType, updateModalType} from "@/store/slices/appearanceSlice";
import {getTodayDate} from "@/utils/global";

const AddEventButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept)


    const handleClick = () => {
        const newEvent = {id: 0, name: '', description: '', date: '', ephemerisTime: 0, keynote: 1, timelineInfo: [], updatedDt: getTodayDate()}
        dispatch(updateCurrentEvent(newEvent))
        dispatch(updateCurrentEventDraft(newEvent))
        dispatch(updateEventContentType('new'))
        dispatch(updateModalType('event'))
    }

    return (
        <button onClick={handleClick} className={`pl-1.5 pr-2.5 flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md ${timelineType === 'demo' && demoKeyConcept === 'edit' && 'outline outline-2 outline-blue-700'}`}>
            <div className={'material-symbols-outlined text-[20px]'}>&#xe145;</div>
            <div className={'text-sm font-semibold'}>Add Event</div>
        </button>
    )
}

export default AddEventButton;
