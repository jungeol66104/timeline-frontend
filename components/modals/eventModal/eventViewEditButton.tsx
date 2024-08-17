import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectEventContentType, selectTimelineType, updateEventContentType, updateEventHistoryType} from "@/store/slices/appearanceSlice";

const EventViewEditButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const eventContentType = useSelector(selectEventContentType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept)


    const handleClick = (contentType: string) => {
        if (contentType === 'history') dispatch(updateEventHistoryType('list'))
        dispatch(updateEventContentType(contentType))
    }

    return (
        <div className={`flex items-center p-0.5 gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md ${timelineType === 'demo' && demoKeyConcept === 'edit' && 'outline outline-2 outline-blue-700'}`}>
            <button onClick={() => handleClick('view')} className={`px-2.5 w-[55px] h-8 text-sm rounded-md ${eventContentType === 'view' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>View</button>
            <button onClick={() => handleClick('edit')} className={`px-2.5 w-[46px] h-8 text-sm rounded-md ${eventContentType === 'edit' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>Edit</button>
        </div>
    );
};

export default EventViewEditButton;
