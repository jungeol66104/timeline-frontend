import React from 'react';
import RevertButton from "@/components/common/contribution/revertButton";
import UsernameButton from "@/components/common/usernameButton";
import OpenTimelineButton from "@/components/common/contribution/openTimelineButton";

const TimelineContribution = () => {
    return (
        <div className={'py-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between'}>
                <div className={'text-xs text-gray-500'}>January 01, 2024</div>
                <div className={'text-[10px] font-semibold'}>TIMELINE</div>
            </div>
            <div className={'font-bold'}>Hagia Sophia</div>
            <div className={'text-sm'}>Added some new information.</div>
            <div className={'mt-3 flex items-center justify-between'}>
                <UsernameButton name={'Nickname'}/>
                <div className={'flex items-center gap-2.5'}>
                    <RevertButton />
                    <OpenTimelineButton />
                </div>
            </div>
        </div>
    );
};

export default TimelineContribution;
