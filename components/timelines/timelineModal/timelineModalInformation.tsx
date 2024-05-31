import React from 'react';
import Image from 'next/image'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectIsEdit, selectTimelineModalType, updateIsEdit, updateTimelineModalType} from "@/store/slices/appearanceSlice";
import {formatDate, getBody} from "@/utils/global";
import InformationTiptap from "@/components/timelines/timelineModal/informationTiptap";
import InformationView from "@/components/timelines/timelineModal/informationView";

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

    const bottom = timelineModalType === 'information' ? 0 : '-100%'
    return (
        <div className={'timelineModalInformation fixed w-full max-w-lg h-full left-1/2 transform -translate-x-1/2 bg-white rounded-t-2xl flex flex-col items-center'} style={{zIndex: 5002, height: 'calc(100% - 61px)', bottom: bottom, transition: 'bottom 0.3s'}}>
            <div className={'relative py-2.5 border-b-[1px] w-full text-center'}>
                <h2 className={'font-semibold text-md'}>Information</h2>
                <button className={'absolute right-4 top-3 w-[20px] h-[20px] shrink-0'}><Image onClick={handleClose} src={'/svg/close.svg'} alt={'close'} width={20} height={20}/></button>
            </div>
            <div className={'p-4 w-full h-full overflow-y-scroll'}>
                <div className={'w-full'}>
                    <h1 className={'timelineInformationName text-2xl font-bold'}>{currentTimeline.name}</h1>
                    <div className={'text-md'}>{currentTimeline.description}</div>
                    <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Last Updated: January 14, 2024</div>
                    {isEdit
                        ?   <InformationTiptap />
                        :   <InformationView />
                    }
                </div>
            </div>
        </div>

    );
};
export default TimelineModalInformation;
