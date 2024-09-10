import React from 'react';
import RevertButton from "@/components/common/contributions/revertButton";
import UsernameButton from "@/components/common/usernameButton";
import CompareRadioButtons from "@/components/common/contributions/compareRadioButtons";
import OpenModalButton from "@/components/common/contributions/openModalButton";
import InformationTitleButton from "@/components/common/contributions/informationTitleButton";

const TimelineContribution = ({type, contribution}: {type: string, contribution: any}) => {

    return (
        <div className={'py-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between'}>
                <div className={'text-xs text-gray-500'}>{contribution.createdDT}</div>
                {type === 'timeline'
                    ?   <CompareRadioButtons />
                    :   <div className={'text-[10px] font-semibold'}>TIMELINE</div>
                }
            </div>
            <div><InformationTitleButton contribution={contribution} /></div>
            <div className={'text-sm'}>
                {contribution.editHistoryType === 5 && 'Created.'}
                {contribution.editHistoryType === 7 && 'Edited the information.'}
            </div>
            <div className={'mt-3 flex items-center justify-between'}>
                <UsernameButton user={contribution.userInfo} />
                <div className={'flex items-center gap-2.5'}>
                    {type === 'timeline' && <RevertButton/>}
                    <OpenModalButton contribution={contribution}/>
                </div>
            </div>
        </div>
    );
};

export default TimelineContribution;
