import React from 'react';
import RevertButton from "@/components/common/contributions/revertButton";
import UsernameButton from "@/components/common/usernameButton";
import CompareRadioButtons from "@/components/common/contributions/compareRadioButtons";
import OpenModalButton from "@/_deprecated/openModalButton";
import OpenInformationButton from "@/components/common/contributions/openInformationButton";

const TimelineContribution = ({type, contribution}: {type: string, contribution: any}) => {

    return (
        <div className={'py-3 flex flex-col gap-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center justify-center gap-3'}>
                    <UsernameButton user={contribution.userInfo}/>
                    <div>
                        <div className={'text-xs text-gray-500'}>Timeline</div>
                        <div className={'text-xs text-gray-500'}>{contribution.createdDT}</div>
                    </div>
                </div>
                <div className={'flex items-center gap-2.5'}>
                    {type === 'timeline' && <RevertButton/>}
                </div>
            </div>
            <div>
                <span className={'text-sm'}>{contribution.editHistoryType === 5 ? 'Created the timeline ' : 'Edited the timeline '} </span>
                <OpenInformationButton type={'view'} contribution={contribution}/>
                <span> (<OpenInformationButton type={'revision'} contribution={contribution} />) </span>
            </div>
        </div>
    );
};

export default TimelineContribution;
