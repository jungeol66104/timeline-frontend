import React from 'react';
import NicknameButton from "@/components/common/nicknameButton";
import UndoButton from "@/components/common/contribution/undoButton";

const ConnectionContribution = ({type}: {type: string}) => {
    return (
        <div className={'py-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between'}>
                <div className={'text-xs text-gray-500'}>January 01, 2024</div>
                <div className={'text-[10px] font-semibold'}>CONNECTION</div>
            </div>
            <div>
                <span className={'font-bold hover:underline cursor-pointer'}>Commissioning of the original church by Constantine I</span>
                <span className={'text-sm'}> connected to </span>
                <span className={'font-bold hover:underline cursor-pointer'}>Hagia Sophia</span>
            </div>
            <div className={'mt-3 flex items-center justify-between'}>
                <NicknameButton name={'Nickname'}/>
                <div className={'flex items-center gap-2.5'}>
                    {type === 'timeline' || type === 'event' && <UndoButton/>}
                </div>
            </div>
        </div>
    );
};

export default ConnectionContribution;
