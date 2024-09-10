import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentPageContributions} from "@/store/slices/contentsSlice";
import TimelineContribution from "@/components/common/contributions/contribution/timelineContribution";
import EventContribution from "@/components/common/contributions/contribution/eventContribution";
import AttachmentContribution from "@/components/common/contributions/contribution/attachmentContribution";
import KeynoteContribution from "@/components/common/contributions/contribution/keynoteContribution";
import ExploreButton from "@/components/about/exploreButton";

const ProfileContributions = () => {
    const currentPageContributions = useSelector(selectCurrentPageContributions);
    const isEmptyContributions = currentPageContributions.length === 0

    return (
        <div className={'w-full'}>
            {currentPageContributions.map(contribution => {
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
            {isEmptyContributions &&
                <div className='timeline relative py-10 px-4 w-full flex flex-col items-center justify-center gap-5'>
                    <div className={'text-center'}>
                        <h2 className={'text-xl font-semibold'}>No Contributions</h2>
                        <div>See what other contributors have done.</div>
                    </div>
                    <ExploreButton />
                </div>
            }
        </div>
    );
};

export default ProfileContributions;
