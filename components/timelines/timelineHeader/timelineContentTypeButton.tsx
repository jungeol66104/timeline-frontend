import {useDispatch, useSelector} from "react-redux";
import {selectTimelineContentType, updateTimelineContentType, updateTimelineHistoryType} from "@/store/slices/appearanceSlice";

const TimelineContentTypeButton = () => {
    const dispatch = useDispatch()
    const contentType = useSelector(selectTimelineContentType)

    const handleClick = (contentType: string) => {
        if (contentType === 'history') dispatch(updateTimelineHistoryType('list'))
        dispatch(updateTimelineContentType(contentType))
    }

    return (
        <div className={`flex items-center p-0.5 gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md`}>
            <button onClick={() => handleClick('view')} className={`px-2.5 w-[55px] h-8 text-sm rounded-md ${contentType === 'view' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>View</button>
            <button onClick={() => handleClick('edit')} className={`px-2.5 w-[46px] h-8 text-sm rounded-md ${contentType === 'edit' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>Edit</button>
            <button onClick={() => handleClick('history')} className={`px-2.5 w-[70px] h-8 text-sm rounded-md ${contentType === 'history' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>History</button>
        </div>
    );
};

export default TimelineContentTypeButton;
