import React from 'react';
import RevertButton from "@/components/common/contribution/revertButton";
import NicknameButton from "@/components/common/nicknameButton";
import OpenModalButton from "@/components/common/contribution/openModalButton";
import CompareRadioButtons from "@/components/common/contribution/compareRadioButtons";

const EventContribution = ({type}: {type: string}) => {
    return (
        <div className={'py-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between'}>
                <div className={'text-xs text-gray-500'}>January 01, 2024</div>
                <div className={'flex gap-2'}>
                    {type === 'event'
                        ?   <CompareRadioButtons />
                        :   <div className={'text-[10px] font-semibold'}>EVENT</div>
                    }
                </div>
            </div>
            <div className={'font-bold hover:underline cursor-pointer'}>Commissioning of the original church by Constantine I</div>
            <div className={'text-sm'}>Added some new information.</div>
            <div className={'mt-3 flex items-center justify-between'}>
                <NicknameButton name={'Nickname'}/>
                <div className={'flex items-center gap-2.5'}>
                    {type === 'event' && <RevertButton/>}
                    <OpenModalButton/>
                </div>
            </div>
        </div>
    );
};

export default EventContribution;


