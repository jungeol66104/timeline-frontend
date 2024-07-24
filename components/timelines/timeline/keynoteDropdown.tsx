import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsSummary, selectTimelineContentType, updateCurrentPage, updateIsBottomEnd, updateIsSummary, updateTotalPage} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline, TimelineEvent, updateCurrentEvents, updateCurrentEventsDraft} from "@/store/slices/contentsSlice";
import {fetchEvents} from "@/pages/api/global";

const KeynoteDropdown = () => {
    const keynoteDropdownRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const timelineContentType = useSelector(selectTimelineContentType)
    const isKeynote = useSelector(selectIsSummary)
    const isBlock = timelineContentType === 'edit' || timelineContentType === 'new'

    const handleToggle = (e: React.MouseEvent) => {
        const keynoteDropdown = keynoteDropdownRef.current
        if (!keynoteDropdown || isBlock) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!keynoteDropdown.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    const handleClick = (type: string) => {
        const targetIsKeynote = type === 'keynote'

        fetchEvents(currentTimeline.id, 1, targetIsKeynote).then((data) => {
            const events = data.events
            events.forEach((event: TimelineEvent) => event.keynote = 1)
            dispatch(updateCurrentEvents(events))
            dispatch(updateCurrentEventsDraft(events))
            dispatch(updateCurrentPage(1))
            dispatch(updateTotalPage(data.totalPages))
            dispatch(updateIsBottomEnd(data.totalPages === 1))
            dispatch(updateIsSummary(targetIsKeynote))
        })
    }

    return (
        <div className={'relative'}>
            <button ref={keynoteDropdownRef} onClick={handleToggle} className={`${isBlock ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-100'} pl-3 pr-1 w-fit h-[30px] flex items-center gap-1 bg-white border-[1px] border-gray-300 rounded-md`}>
                <span className={'text-sm font-semibold'}>{isKeynote ? 'Keynote' : 'All'}</span>
                <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe5c5;</div>
            </button>
            {isToggle &&
                <div className={'absolute top-[32px] right-0 p-1.5 w-[96px] flex flex-col items-start bg-white border-[1px] border-gray-300 rounded-md shadow-md'}>
                    <button onClick={() => handleClick('all')} className={'w-full h-[30px] flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-md bg-white hover:bg-gray-100 text-left text-sm font-semibold'}>All</button>
                    <button onClick={() => handleClick('keynote')} className={'w-full h-[30px] flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-md bg-white hover:bg-gray-100 text-left text-sm font-semibold'}>Keynote</button>
                </div>
            }
        </div>
    );
};

export default KeynoteDropdown;
