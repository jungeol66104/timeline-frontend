import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectIsKeynote, selectTimelineType, updateCurrentPage, updateIsBottomEnd, updateIsKeynote, updateTotalPage} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline, TimelineEvent, updateCurrentEvents, updateCurrentEventsDraft} from "@/store/slices/contentsSlice";
import {fetchEvents} from "@/pages/api/global";

const KeynoteButton = () => {
    const keynoteButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const isKeynote = useSelector(selectIsKeynote)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    const handleToggle = (e: React.MouseEvent) => {
        const keynoteButton = keynoteButtonRef.current
        if (!keynoteButton) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!keynoteButton.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    const handleClick = (type: string) => {
        const targetIsKeynote = type === 'keynote'

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
        <div className={'relative'}>
            <button ref={keynoteButtonRef} onClick={handleToggle} className={`hover:bg-gray-100 pl-3 pr-1 w-fit h-[30px] flex items-center gap-1 bg-white border-[1px] border-gray-300 ${timelineType === 'demo' && demoKeyConcept === 'keynote' && 'outline outline-2 outline-blue-700'} rounded-md`}>
                <span className={'text-sm font-semibold'}>{isKeynote ? 'Keynote' : 'All'}</span>
                <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe5c5;</div>
            </button>
            {isToggle &&
                <div className={`absolute top-[32px] right-0 p-1 w-[97px] flex flex-col items-start bg-white border-[1px] border-gray-300 rounded-md shadow-md`}>
                    <button onClick={() => handleClick('all')} className={'pl-2 pr-1 py-1.5 w-full h-[30px] flex items-center justify-between rounded-md bg-white hover:bg-gray-100 text-left text-sm font-semibold'}><span>All</span>{!isKeynote && <div className={'material-symbols-outlined font-semibold shrink-0 text-[12px]'}>&#xe5ca;</div>}</button>
                    <button onClick={() => handleClick('keynote')} className={'pl-2 pr-1 py-1.5 w-full h-[30px] flex items-center justify-between rounded-md bg-white hover:bg-gray-100 text-left text-sm font-semibold'}><span>Keynote</span>{isKeynote && <div className={'material-symbols-outlined font-semibold shrink-0 text-[12px]'}>&#xe5ca;</div>}</button>
                </div>
            }
        </div>
    );
};

export default KeynoteButton;
