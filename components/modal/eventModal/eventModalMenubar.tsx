import ContributorsButton from "@/components/common/contributorsButton";
import EventModalContentTypeButton from "@/components/modal/eventModal/eventModalContentTypeButton";
import {useSelector} from "react-redux";
import {selectModalContentType, selectTimelineContentType} from "@/store/slices/appearanceSlice";
import UsernameButton from "@/components/common/usernameButton";
import React from "react";
import {selectSession} from "@/store/slices/privateSlice";

const EventModalMenubar = () => {
    const session = useSelector(selectSession)
    const timelineContentType = useSelector(selectTimelineContentType);
    const modalContentType = useSelector(selectModalContentType)

    return (
        <div className={'mt-3 w-full flex justify-between z-10'}>
            <div className={'w-full flex gap-3'}>
                {modalContentType === 'new' || timelineContentType === 'new'
                    ?   <UsernameButton name={session.nickName || 'nickName'}/>
                    :   <ContributorsButton/>
                }
            </div>
            {modalContentType !== 'new' && <EventModalContentTypeButton/>}
        </div>
    );
};

export default EventModalMenubar;
