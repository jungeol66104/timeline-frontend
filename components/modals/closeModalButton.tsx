import {useDispatch, useSelector} from "react-redux";
import {selectTimelineType, updateEventContentType, updateEventHistoryType, updateModalType} from "@/store/slices/appearanceSlice";

const CloseModalButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)

    const handleClick = () => {
        dispatch(updateModalType('none'))
        if (timelineType !== 'new') {
            dispatch(updateEventContentType('view'))
            dispatch(updateEventHistoryType('list'))
        }
    }

    return (
        <button onClick={handleClick} className={'absolute right-1 top-1 px-2 h-[36px] hover:bg-gray-100 rounded-2xl shrink-0 material-symbols-outlined text-[20px]'}>&#xe5cd;</button>
    );
};

export default CloseModalButton;
