import {useDispatch, useSelector} from "react-redux";
import {selectTimelineContentType, updateCurrentPage, updateIsBottomEnd, updateIsSummary, updateTimelineContentType, updateTimelineHistoryType, updateTotalPage} from "@/store/slices/appearanceSlice";
import {fetchEvents} from "@/pages/api/global";
import {selectCurrentTimeline, TimelineEvent, updateCurrentEvents, updateCurrentEventsDraft} from "@/store/slices/contentsSlice";
import React from "react";

const TimelineContentTypeButton = () => {
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const contentType = useSelector(selectTimelineContentType)

    const handleClick = (contentType: string) => {
        if (contentType === 'history') dispatch(updateTimelineHistoryType('list'))
        else if (contentType === 'edit') {
            // fetchEvents(currentTimeline.id, 1, false).then((data) => {
            //     const events = data.events
            //     events.forEach((event: TimelineEvent) => event.keynote = 1)
            //     dispatch(updateCurrentEvents(events))
            //     dispatch(updateCurrentEventsDraft(events))
            //     dispatch(updateCurrentPage(1))
            //     dispatch(updateTotalPage(data.totalPages))
            //     dispatch(updateIsBottomEnd(data.totalPages === 1))
            //     dispatch(updateIsSummary(false))
            // })
        }
        dispatch(updateTimelineContentType(contentType))
    }

    return (
        <div className={`flex items-center p-0.5 gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md`}>
            <button onClick={() => handleClick('view')} className={`px-2.5 w-[55px] h-8 text-sm rounded-md ${contentType === 'view' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>View</button>
            <button onClick={() => handleClick('edit')} className={`px-2.5 w-[46px] h-8 text-sm rounded-md ${contentType === 'edit' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>Edit</button>
            <button className={`w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 font-semibold`}>
                <div className={'material-symbols-outlined text-[22px]'}>&#xe5d3;</div>
            </button>
        </div>
    );
};

export default TimelineContentTypeButton;
