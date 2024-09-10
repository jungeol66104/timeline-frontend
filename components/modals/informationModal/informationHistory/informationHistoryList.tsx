import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentModalContributions} from "@/store/slices/contentsSlice";
import KeynoteContribution from "@/components/common/contributions/contribution/keynoteContribution";
import AttachmentContribution from "@/components/common/contributions/contribution/attachmentContribution";
import TimelineContribution from "@/components/common/contributions/contribution/timelineContribution";
import EventContribution from "@/components/common/contributions/contribution/eventContribution";
import CompareButton from "@/components/modals/compareButton";

const InformationHistoryList = () => {
    const currentContributions = useSelector(selectCurrentModalContributions);

    return (
        <>
            <div className={'pb-3 flex items-center justify-between'}>
                {/*<div className={''}></div>*/}
                {/*<CompareButton/>*/}
            </div>
            <hr/>
            <div className={'w-full'}>
                {currentContributions.map(contribution => {
                    switch (contribution.editHistoryType) {
                        case 1:
                        case 2:
                            return <KeynoteContribution type={'histories'} contribution={contribution}/>
                        case 3:
                        case 4:
                            return <AttachmentContribution type={'histories'} contribution={contribution}/>
                        case 5:
                        case 7:
                            return <TimelineContribution type={'histories'} contribution={contribution}/>
                        case 6:
                        case 8:
                            return <EventContribution type={'histories'} contribution={contribution}/>
                    }
                })}
            </div>
        </>
    );
};

export default InformationHistoryList;
