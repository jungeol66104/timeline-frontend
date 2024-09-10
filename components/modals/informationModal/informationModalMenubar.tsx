import React from 'react';
import {useSelector} from "react-redux";
import {selectDemoKeyConcept, selectInformationContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectSession} from "@/store/slices/privateSlice";
import UsernameButton from "@/components/common/usernameButton";
import ContributorsButton from "@/components/common/contributorsButton";
import InformationViewEditButton from "@/components/modals/informationModal/informationViewEditButton";
import HistoryButton from "@/components/modals/historyButton";

const InformationModalMenubar = () => {
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType);
    const informationContentType = useSelector(selectInformationContentType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept)
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'pt-3 w-full flex justify-between'}>
            {timelineType === 'public' && <ContributorsButton contributors={currentTimeline.contributors!}/>}
            {timelineType === 'private' && <UsernameButton user={session} />}
            {timelineType === 'new' && <UsernameButton user={session} />}
            {timelineType === 'demo' && demoKeyConcept !== 'private' && <ContributorsButton contributors={currentTimeline.contributors!}/>}
            {timelineType === 'demo' && demoKeyConcept === 'private' && <UsernameButton user={{username: 'you', cdnUrl: 'https://cdn.timeline.vg/', imagePath: 'base-image.png'}} />}
            {informationContentType !== 'new' &&
                <div className={'flex gap-3'}>
                    {timelineType !== 'new' && <InformationViewEditButton/>}
                    {timelineType === 'public' && <HistoryButton />}
                </div>
            }
        </div>
    )
}
export default InformationModalMenubar
