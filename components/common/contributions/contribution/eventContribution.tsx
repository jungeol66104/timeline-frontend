import React from 'react';
import RevertButton from "@/components/common/contributions/revertButton";
import UsernameButton from "@/components/common/usernameButton";
import CompareRadioButtons from "@/components/common/contributions/compareRadioButtons";
import OpenEventButton from "@/components/common/contributions/openEventButton";

const EventContribution = ({type, contribution}: {type: string, contribution: any}) => {

    return (
        <div className={'py-3 flex flex-col gap-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center justify-center gap-3'}>
                    <UsernameButton user={contribution.userInfo}/>
                    <div>
                        <div className={'text-xs text-gray-500'}>Event</div>
                        <div className={'text-xs text-gray-500'}>{contribution.createdDT}</div>
                    </div>
                </div>
                <div className={'flex items-center gap-2.5'}>
                    {type === 'event' && <RevertButton/>}
                </div>
            </div>
            <div>
                <span className={'text-sm'}>{contribution.editHistoryType === 6 ? 'Created the event ' : 'Edited the event '}</span>
                <OpenEventButton type={'view'} contribution={contribution}/>
                <span> (<OpenEventButton type={'revision'} contribution={contribution}/>) </span>
            </div>
        </div>
    );
};

export default EventContribution;


