import React from 'react';
import {useSelector} from "react-redux";
import {selectDemoKeyConcept, selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectSession} from "@/store/slices/privateSlice";
import UsernameButton from "@/components/common/usernameButton";
import ContributorsButton from "@/components/common/contributorsButton";
import InformationViewEditButton from "@/components/modals/informationModal/informationViewEditButton";
import HistoryButton from "@/components/modals/historyButton";

const InformationModalMenubar = () => {
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept)
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'pt-3 w-full flex justify-between'}>
            <div className={'flex items-center justify-center gap-3'}>
                {timelineType === 'public' && <ContributorsButton contributors={currentTimeline.contributors!}/>}
                {timelineType === 'private' && <UsernameButton user={session}/>}
                {timelineType === 'new' && <UsernameButton user={session}/>}
                {timelineType === 'demo' && demoKeyConcept !== 'private' && <ContributorsButton contributors={currentTimeline.contributors!}/>}
                {timelineType === 'demo' && demoKeyConcept === 'private' && <UsernameButton user={{username: 'you', cdnUrl: 'https://cdn.timeline.vg/', imagePath: 'base-image.png'}}/>}
                {(timelineType === 'public' || timelineType === 'private') &&
                    <div className={'flex flex-col text-gray-400 text-xs'}>
                        <div>Last Updated:</div>
                        <div className={'max-[449.9px]:hidden'}>{currentTimeline.informationUpdatedDT}</div>
                        <div className={'min-[450px]:hidden'}>{currentTimeline.informationUpdatedDT?.split(' ')[0]}</div>
                    </div>
                }
            </div>
            <div className={'flex gap-3'}>
                {timelineType !== 'new' && <InformationViewEditButton/>}
                {timelineType === 'public' && <HistoryButton/>}
            </div>
        </div>
    )
}
export default InformationModalMenubar
