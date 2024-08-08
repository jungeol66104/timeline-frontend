import React from "react";
import {useSelector} from "react-redux";
import {selectSession} from "@/store/slices/privateSlice";
import {selectModalContentType, selectTimelineContentType} from "@/store/slices/appearanceSlice";
import NicknameButton from "@/components/common/nicknameButton";
import ContributorsButton from "@/components/common/contributorsButton";
import EventModalContentTypeButton from "@/components/modals/eventModal/eventModalContentTypeButton";

const EventModalMenubar = () => {
    const session = useSelector(selectSession)
    const timelineContentType = useSelector(selectTimelineContentType);
    const modalContentType = useSelector(selectModalContentType)

    return (
        <div className={'mt-3 w-full flex justify-between z-10'}>
            <div className={'w-full flex gap-3'}>
                {modalContentType === 'new' || timelineContentType === 'new'
                    ?   <NicknameButton name={session.nickName || 'Nickname'}/>
                    :   <ContributorsButton/>
                }
            </div>
            {modalContentType !== 'new' && <EventModalContentTypeButton/>}
        </div>
    );
};

export default EventModalMenubar;
