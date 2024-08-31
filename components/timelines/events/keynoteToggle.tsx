import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline, TimelineEvent, updateCurrentEvents} from "@/store/slices/contentsSlice";
import {selectDemoKeyConcept, selectIsKeynote, selectTimelineType, updateCurrentPage, updateIsBottomEnd, updateIsKeynote, updateTotalPage} from "@/store/slices/appearanceSlice";
import {fetchEvents} from "@/pages/api/global";

const KeynoteToggle = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept);
    const isKeynote = useSelector(selectIsKeynote)
    const currentTimeline = useSelector(selectCurrentTimeline)

    const handleClick = () => {
        const targetIsKeynote = !isKeynote

        if (timelineType === 'public' || timelineType === 'private') {
            fetchEvents(currentTimeline.id, 1, targetIsKeynote).then((data) => {
                const events = data.events
                events.forEach((event: TimelineEvent) => event.keynote = +targetIsKeynote)
                dispatch(updateCurrentEvents(events))
                dispatch(updateCurrentPage(1))
                dispatch(updateTotalPage(data.totalPages))
                dispatch(updateIsBottomEnd(data.totalPages === 1))
            })
        }
        dispatch(updateIsKeynote(targetIsKeynote))
    }

    return (
        <button onClick={handleClick} className={`px-3 flex items-center justify-center gap-1.5 h-[36px] rounded-md ${isKeynote && 'text-blue-700'} ${timelineType === 'demo' && demoKeyConcept === 'keynote' && 'outline outline-2 outline-blue-700'}`}>
            <div className={`text-sm font-semibold`}>Keynote</div>
            {<div className={`${isKeynote ? 'material-symbols-filled' : 'material-symbols-outlined'} text-[20px]`}>&#xe86c;</div>}
        </button>
    );
};

export default KeynoteToggle;
