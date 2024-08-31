import React from 'react';
import {useSelector} from "react-redux";
import {selectDemoKeyConcept, selectInformationContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import ContributorsButton from "@/components/common/contributorsButton";
import UsernameButton from "@/components/common/usernameButton";
import {selectSession} from "@/store/slices/privateSlice";
import InformationViewEditButton from "@/components/modals/timelineModal/informationViewEditButton";
import TemporaryHistoryButton from "@/components/modals/temporaryHistoryButton";

const InformationModalMenubar = () => {
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType);
    const timelineContentType = useSelector(selectInformationContentType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    return (
        <div className={'pt-3 w-full flex justify-between'}>
            {timelineType === 'new' || timelineType === 'private' || (timelineType === 'demo' && demoKeyConcept === 'private')
                ? <UsernameButton name={session.nickName || 'Nickname'}/>
                : <ContributorsButton/>
            }
            {timelineContentType !== 'new' &&
                <div className={'flex gap-3'}>
                    {timelineType !== 'new' && <InformationViewEditButton/>}
                    {timelineType === 'public' && <TemporaryHistoryButton />}
                </div>
            }
        </div>
    )
}
export default InformationModalMenubar
