import React from 'react';
import RevertButton from "@/components/common/contribution/revertButton";
import UsernameButton from "@/components/common/usernameButton";
import CompareRadioButtons from "@/components/common/contribution/compareRadioButtons";
import OpenModalButton from "@/components/common/contribution/openModalButton";

const TimelineContribution = ({type}: {type: string}) => {
    return (
        <div className={'py-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between'}>
                <div className={'text-xs text-gray-500'}>January 01, 2024</div>
                {type === 'timeline'
                    ?   <CompareRadioButtons />
                    :   <div className={'text-[10px] font-semibold'}>TIMELINE</div>
                }
            </div>
            {/* later alternate to link */}
            <div className={'font-bold hover:underline cursor-pointer'}>Hagia Sophia</div>
            <div className={'text-sm'}>Added some new information.</div>
            <div className={'mt-3 flex items-center justify-between'}>
                <UsernameButton name={'Nickname'}/>
                <div className={'flex items-center gap-2.5'}>
                    {type === 'timeline' && <RevertButton/>}
                    <OpenModalButton />
                </div>
            </div>
        </div>
    );
};

export default TimelineContribution;
