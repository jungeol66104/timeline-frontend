import React from 'react';
import Image from 'next/image'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import {selectIsEdit, selectTimelineModalType, updateIsEdit, updateTimelineModalType} from "@/store/slices/appearanceSlice";
import {formatDate, getBody} from "@/utils/global";
import EventTiptap from "@/components/timelines/timelineModal/eventTiptap";
import EventView from "@/components/timelines/timelineModal/eventView";

const TimelineModalEvent = () => {
    const dispatch = useDispatch()
    const timelineModalType = useSelector(selectTimelineModalType)
    const currentEvent = useSelector(selectCurrentEvent)
    const isEdit = useSelector(selectIsEdit)

    const handleClick = () => {
        const body = getBody()
        if (!body) return

        dispatch(updateIsEdit(false))
        dispatch(updateTimelineModalType('none'))
    }

    const bottom = timelineModalType === 'event' ? 0 : '-100%'
    return (
        <div className={'timelineModalEvent fixed w-full max-w-lg h-full left-1/2 transform -translate-x-1/2 bg-white rounded-t-2xl flex flex-col items-center'} style={{zIndex: 5002, height: 'calc(100% - 90px)', bottom: bottom, transition: 'bottom 0.3s'}}>
            <div className={'relative py-2.5 border-b-[1px] w-full text-center'}>
                <h2 className={'font-semibold text-md'}>Event</h2>
                <button className={'absolute right-4 top-3 w-[20px] h-[20px] shrink-0'}><Image onClick={handleClick} src={'/svg/close.svg'} alt={'close'} width={20} height={20}/></button>
            </div>
            <div className={'p-4 w-full h-full overflow-y-scroll'}>
                <div className={'w-full pb-3'}>
                    <span className={'text-md font-medium'}>{currentEvent.date}</span>
                    <h1 className={'text-2xl font-bold'}>{currentEvent.name}</h1>
                    <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Last Updated: {formatDate(currentEvent.updatedDT)}</div>
                    {isEdit
                        ?   <EventTiptap />
                        :   <EventView />
                    }
                </div>
            </div>
        </div>
    )
}
export default TimelineModalEvent
