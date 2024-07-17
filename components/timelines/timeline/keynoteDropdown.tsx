import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsSummary, updateCurrentPage, updateIsBottomEnd, updateIsSummary, updateTotalPage} from "@/store/slices/appearanceSlice";
import api from "@/pages/api/api";
import {selectCurrentTimeline, updateCurrentEvents} from "@/store/slices/contentsSlice";

const KeynoteDropdown = () => {
    const keynoteDropdownRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const dispatch = useDispatch()
    const isKeynote = useSelector(selectIsSummary)
    const currentTimeline = useSelector(selectCurrentTimeline)

    const handleToggle = (e: React.MouseEvent) => {
        const keynoteDropdown = keynoteDropdownRef.current
        if (!keynoteDropdown) return
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

        const fetchEvents = async (targetIsKeynote: boolean) => {
            try {
                const response = await api.get(`/timeline/${currentTimeline.id}/paged?pageNum=1&pageSize=41&isSummary=${targetIsKeynote}`, {headers: {lang: 'en'}})
                return response.data.data
            } catch (error) {
                console.error('Error fetching data in KeynoteDropdown: ', error)
                return
            }
        }

        fetchEvents(targetIsKeynote).then((data) => {
            dispatch(updateCurrentEvents(data.events))
            dispatch(updateCurrentPage(1))
            dispatch(updateTotalPage(data.totalPages))
            dispatch(updateIsBottomEnd(data.totalPages === 1))
            dispatch(updateIsSummary(targetIsKeynote))
        })
    }

    return (
        <div className={'relative'}>
            <button ref={keynoteDropdownRef} onClick={handleToggle} className={`pl-3 pr-1 w-fit h-[30px] flex items-center gap-1 bg-white border-[1px] border-gray-300 rounded-md`}>
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
