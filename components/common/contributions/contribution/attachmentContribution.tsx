import React from 'react';
import UsernameButton from "@/components/common/usernameButton";
import UndoButton from "@/components/common/contributions/undoButton";
import OpenEventButton from "@/components/common/contributions/openEventButton";
import OpenInformationButton from "@/components/common/contributions/openInformationButton";

const AttachmentContribution = ({type, contribution}: {type: string, contribution: any}) => {

    return (
        <div className={'py-3 flex flex-col gap-3 border-b-[1px] border-[#E5E7EB]'}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center justify-center gap-3'}>
                    <UsernameButton user={contribution.userInfo}/>
                    <div>
                        <div className={'text-xs text-gray-500'}>Attachment</div>
                        <div className={'text-xs text-gray-500'}>{contribution.createdDT}</div>
                    </div>
                </div>
                {/*<div className={'flex items-center gap-2.5'}>*/}
                {/*    {type === 'timeline' || type === 'event' && <UndoButton/>}*/}
                {/*</div>*/}
            </div>
            <div>
                <span className={'text-sm'}>The event </span>
                <OpenEventButton type={'view'} contribution={contribution}/>
                <span className={'text-sm'}>{contribution.editHistoryType === 3 ? ' detached from the timeline ' : ' attached to the timeline '} </span>
                <OpenInformationButton type={'view'} contribution={contribution}/>
            </div>
        </div>
    );
};

export default AttachmentContribution;
