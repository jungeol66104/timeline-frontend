import React from 'react';
import Image from 'next/image'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import {selectTimelineModalType, updateTimelineModalType} from "@/store/slices/appearanceSlice";
import {formatDate, getBody} from "@/utils/global";

const TimelineModalEvent = () => {
    const dispatch = useDispatch()
    const timelineModalType = useSelector(selectTimelineModalType)
    const currentEvent = useSelector(selectCurrentEvent)

    const handleClick = () => {
        const body = getBody()
        if (!body) return

        dispatch(updateTimelineModalType('none'))
        body.style.overflow = 'scroll'
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
                    <span className={'text-md font-semibold'}>{currentEvent.date}</span>
                    <h1 className={'text-2xl font-bold'}>{currentEvent.name}</h1>
                    <div className={'my-1 flex gap-1 text-gray-500 font-medium text-sm'}>
                        by<span>Timeline</span>·<span>{formatDate(currentEvent.createdDT)}</span>
                    </div>
                    <div className={'flex justify-end'}>
                        <button className={`flex items-center gap-2.5 pl-1.5 pr-3 h-[30px] max-[850px]:h-[36px] max-[850px]:w-full font-semibold min-[850px]:border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
                            <div className={'w-5 shrink-0'}><Image src={'/svg/edit.svg'} alt={'editEvent'} width={20} height={20}/></div>
                            <div className={'text-sm font-semibold max-[850px]:w-full'}>Edit</div>
                        </button>
                    </div>
                </div>
                <hr/>
                <p className={'mt-[6px]'}>{currentEvent.description}</p>
            </div>
        </div>

    );
};
export default TimelineModalEvent;
