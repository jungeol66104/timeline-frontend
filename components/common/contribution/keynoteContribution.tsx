import React from 'react';
import UsernameButton from "@/components/common/usernameButton";
import OpenEventButton from "@/components/common/contribution/openEventButton";
import UndoButton from "@/components/common/contribution/undoButton";
import OpenTimelineButton from "@/components/common/contribution/openTimelineButton";

const KeynoteContribution = () => {
    return (
        <div className={'py-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between'}>
                <div className={'text-xs text-gray-500'}>January 01, 2024</div>
                <div className={'text-[10px] font-semibold'}>KEYNOTE</div>
            </div>
            <div>
                <span className={'font-bold'}>Commissioning of the original church by Constantine I</span>
                <span> included into the keynote of </span>
                <span className={'font-bold'}>Hagia Sophia</span>
            </div>
            <div className={'mt-3 flex items-center justify-between'}>
                <UsernameButton name={'Nickname'}/>
                <div className={'flex items-center gap-2.5'}>
                    <UndoButton />
                    <OpenEventButton />
                    <OpenTimelineButton />
                </div>
            </div>
        </div>
    );
};

export default KeynoteContribution;
