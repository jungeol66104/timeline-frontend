import React from 'react';
import Image from 'next/image'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectIsEdit, selectTimelineModalType, updateIsEdit, updateTimelineModalType} from "@/store/slices/appearanceSlice";
import {formatDate, getBody} from "@/utils/global";
import TimelineInformationTiptap from "@/components/timelines/timelineModal/timelineInformationTiptap";

const TimelineModalInformation = () => {
    const dispatch = useDispatch()
    const timelineModalType = useSelector(selectTimelineModalType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const isEdit = useSelector(selectIsEdit)

    const handleClose = () => {
        const body = getBody()
        if (!body) return

        dispatch(updateIsEdit(false))
        dispatch(updateTimelineModalType('none'))
        body.style.overflow = 'auto'
    }

    const handleEdit = () => {

    }

    const bottom = timelineModalType === 'information' ? 0 : '-100%'
    return (
        <div className={'timelineModalInformation fixed w-full max-w-lg h-full left-1/2 transform -translate-x-1/2 bg-white rounded-t-2xl flex flex-col items-center'} style={{zIndex: 5002, height: 'calc(100% - 61px)', bottom: bottom, transition: 'bottom 0.3s'}}>
            <div className={'relative py-2.5 border-b-[1px] w-full text-center'}>
                <h2 className={'font-semibold text-md'}>Information</h2>
                <button className={'absolute right-4 top-3 w-[20px] h-[20px] shrink-0'}><Image onClick={handleClose} src={'/svg/close.svg'} alt={'close'} width={20} height={20}/></button>
            </div>
            <div className={'p-4 w-full h-full overflow-y-scroll'}>
                <div className={'w-full pb-3'}>
                    <h1 className={'timelineInformationName text-2xl font-bold'}>{currentTimeline.name}</h1>
                    <div className={'text-md text-gray-500'}>{currentTimeline.description}</div>
                    <div className={'my-1 flex gap-1 text-gray-500 font-medium text-sm'}><span>by Timeline · January 14, 2024</span></div>
                    <div className={'flex justify-end'}>
                        <button onClick={() => dispatch(updateIsEdit(true))} className={`flex items-center gap-2.5 pl-1.5 pr-3 h-[30px] max-[850px]:h-[36px] font-semibold border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
                            <div className={'w-5 shrink-0'}><Image src={'/svg/edit.svg'} alt={'editEvent'} width={20} height={20}/></div>
                            <div className={'text-sm font-semibold max-[850px]:w-full'}>Edit</div>
                        </button>
                    </div>
                </div>
                <hr/>
                {isEdit
                    ? <TimelineInformationTiptap/>
                    : <p className={'mt-3'}>{currentTimeline.content}</p>
                }
            </div>
        </div>

    );
};
export default TimelineModalInformation;
