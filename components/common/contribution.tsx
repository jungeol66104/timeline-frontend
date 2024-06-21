import React from 'react';
import RevertButton from "@/components/common/revertButton";
import ViewButton from "@/components/common/viewButton";

const Contribution = () => {
    return (
        <div className={'py-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between font-semibold text-xs text-black'}>
                <div>1 · <span className={'text-gray-500'}>2024-01-01</span></div>
                <div>Event</div>
            </div>
            <div className={'font-bold'}>Event Title</div>
            <div className={'text-sm'}><span className={'font-semibold'}>(+10)</span> comment</div>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-1.5 py-2.5'}>
                    <div className={'w-[26px] h-[26px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>PI</div>
                    <div className={'text-sm font-medium'}>Nickname</div>
                </div>
                <div className={'flex items-center gap-2.5'}>
                    <RevertButton />
                    <ViewButton />
                </div>
            </div>
        </div>
    );
};

export default Contribution;
