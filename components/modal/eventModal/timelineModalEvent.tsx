import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import {selectContentType, selectModalType, updateIsEdit, updateModalType} from "@/store/slices/appearanceSlice";
import {formatDate, getBody} from "@/utils/global";
import EventEdit from "@/components/modal/eventModal/eventEdit";
import EventView from "@/components/modal/eventModal/eventView";
import TimelineMenubar from "@/components/common/timelineMenubar";
import EventHistory from "@/components/modal/eventModal/eventHistory";

const TimelineModalEvent = () => {
    const dispatch = useDispatch()
    const currentEvent = useSelector(selectCurrentEvent)
    const modalType = useSelector(selectModalType)
    const contentType = useSelector(selectContentType)

    const handleClick = () => {
        const body = getBody()
        if (!body) return

        dispatch(updateIsEdit(false))
        dispatch(updateModalType('none'))
    }

    const bottom = modalType === 'event' ? 0 : '-100%'
    return (
        <div className={'timelineModalEvent fixed left-1/2 transform -translate-x-1/2 w-full max-w-lg h-full flex flex-col items-center bg-white rounded-t-2xl'} style={{zIndex: 5002, height: 'calc(100% - 61px)', bottom: bottom, transition: 'bottom 0.3s'}}>
            <div className={'relative py-2.5 w-full text-center border-b-[1px]'}>
                <h2 className={'text-md font-semibold'}>Event</h2>
                <button onClick={handleClick} className={'absolute right-4 top-3 shrink-0 material-symbols-outlined text-[20px]'}>&#xe5cd;</button>
            </div>
            <div className={'p-4 w-full h-full overflow-y-scroll'}>
                <div className={'pb-3 w-full flex flex-col gap-3'}>
                    <div>
                        <span className={'text-md font-medium'}>{currentEvent.date}</span>
                        <h1 className={'text-2xl font-bold'}>{currentEvent.name}</h1>
                        <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Last Updated: {formatDate(currentEvent.updatedDT)}</div>
                    </div>
                    <TimelineMenubar />
                    {contentType === 'view'
                        ?   <EventView />
                        :   contentType === 'history'
                            ?   <EventHistory />
                            :   <EventEdit />
                    }
                </div>
            </div>
        </div>
    )
}
export default TimelineModalEvent
