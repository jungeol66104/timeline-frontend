import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline, TimelineEvent, updateCurrentEvents, updateCurrentEventsDraft} from "@/store/slices/contentsSlice";
import {selectDemoKeyConcept, selectIsKeynote, updateCurrentPage, updateIsBottomEnd, updateIsKeynote, updateTotalPage} from "@/store/slices/appearanceSlice";
import {fetchEvents} from "@/pages/api/global";

const KeynoteButton = () => {
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const isKeynote = useSelector(selectIsKeynote)
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    const handleClick = () => {
        const targetIsKeynote = !isKeynote

        fetchEvents(currentTimeline.id, 1, targetIsKeynote).then((data) => {
            const events = data.events
            events.forEach((event: TimelineEvent) => event.keynote = +targetIsKeynote)
            dispatch(updateCurrentEvents(events))
            dispatch(updateCurrentEventsDraft(events))
            dispatch(updateCurrentPage(1))
            dispatch(updateTotalPage(data.totalPages))
            dispatch(updateIsBottomEnd(data.totalPages === 1))
            dispatch(updateIsKeynote(targetIsKeynote))
        })
    }

    return (
        <button onClick={handleClick} className={`px-3 flex items-center justify-center gap-1.5 h-[36px] hover:bg-gray-100 rounded-md ${isKeynote && 'text-blue-700'}`}>
            <div className={`text-sm font-semibold`}>Keynote</div>
            {<div className={`${isKeynote ? 'material-symbols-filled' : 'material-symbols-outlined'} text-[20px]`}>&#xe86c;</div>}
        </button>
    );
};

export default KeynoteButton;
