import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectContentType, updateContentType} from "@/store/slices/appearanceSlice";

const ContentTypeButton = () => {
    const dispatch = useDispatch()
    const contentType = useSelector(selectContentType)

    return (
        <div className={`flex items-center p-0.5 gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md`}>
            <button onClick={() => dispatch(updateContentType('view'))} className={`px-2.5 h-8 text-sm rounded-md ${contentType === 'view' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-semibold drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>View</button>
            <button onClick={() => dispatch(updateContentType('history'))} className={`px-2.5 h-8 text-sm rounded-md ${contentType === 'history' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-semibold drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>History</button>
            <button onClick={() => dispatch(updateContentType('edit'))} className={`px-2.5 h-8 text-sm rounded-md ${contentType === 'edit' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-semibold drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>Edit</button>
        </div>
    );
};

export default ContentTypeButton;
