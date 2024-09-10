import React from 'react';
import UsernameButton from "@/components/common/usernameButton";
import UndoButton from "@/components/common/contributions/undoButton";
import EventTitleButton from "@/components/common/contributions/eventTitleButton";
import InformationTitleButton from "@/components/common/contributions/informationTitleButton";

const KeynoteContribution = ({type, contribution}: {type: string, contribution: any}) => {
    return (
        <div className={'py-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between'}>
                <div className={'text-xs text-gray-500'}>{contribution.createdDT}</div>
                <div className={'text-[10px] font-semibold'}>KEYNOTE</div>
            </div>
            <div>
                <EventTitleButton contribution={contribution} />
                <span className={'text-sm'}>{contribution.editHistoryType === 1 ? 'excluded from' : 'included into'} the keynote of </span>
                <InformationTitleButton contribution={contribution} />
            </div>
            <div className={'mt-3 flex items-center justify-between'}>
                <UsernameButton user={contribution.userInfo}/>
                <div className={'flex items-center gap-2.5'}>
                    {type === 'timeline' || type === 'event' && <UndoButton/>}
                </div>
            </div>
        </div>
    );
};

export default KeynoteContribution;
