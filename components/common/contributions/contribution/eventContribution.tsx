import React from 'react';
import RevertButton from "@/components/common/contributions/revertButton";
import UsernameButton from "@/components/common/usernameButton";
import OpenModalButton from "@/components/common/contributions/openModalButton";
import CompareRadioButtons from "@/components/common/contributions/compareRadioButtons";
import EventTitleButton from "@/components/common/contributions/eventTitleButton";

const EventContribution = ({type, contribution}: {type: string, contribution: any}) => {
    return (
        <div className={'py-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between'}>
                <div className={'text-xs text-gray-500'}>{contribution.createdDT}</div>
                <div className={'flex gap-2'}>
                    {type === 'event'
                        ?   <CompareRadioButtons />
                        :   <div className={'text-[10px] font-semibold'}>EVENT</div>
                    }
                </div>
            </div>
            <div><EventTitleButton contribution={contribution} /></div>
            <div className={'text-sm'}>
                {contribution.editHistoryType === 6 && 'Created.'}
                {contribution.editHistoryType === 8 && 'Edited the event.'}
            </div>
            <div className={'mt-3 flex items-center justify-between'}>
                <UsernameButton user={contribution.userInfo} />
                <div className={'flex items-center gap-2.5'}>
                    {type === 'event' && <RevertButton/>}
                    <OpenModalButton contribution={contribution}/>
                </div>
            </div>
        </div>
    );
};

export default EventContribution;


