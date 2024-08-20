import React from 'react';
import SaveEventButton from "@/components/modals/eventModal/eventEdit/saveEventButton";
import AddImageButton from "@/components/common/edit/addImageButton";
import {useSelector} from "react-redux";
import {selectEventContentType} from "@/store/slices/appearanceSlice";
import ResetEditButton from "@/components/common/edit/resetEditButton";
import {getIsBaseImage} from "@/utils/global";
import ReplaceImageButton from "@/components/common/edit/replaceImageButton";
import RemoveImageButton from "@/components/common/edit/removeImageButton";
import DisconnectButton from "@/components/modals/eventModal/eventEdit/disconnectButton";
import KeynoteButton from "@/components/modals/eventModal/eventEdit/keynoteButton";
import {selectCurrentEventDraft, selectCurrentEvents} from "@/store/slices/contentsSlice";

const EventModalEditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const eventContentType = useSelector(selectEventContentType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const isBaseImage = getIsBaseImage(src)
    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isBaseImage && <AddImageButton/>}
                {!isBaseImage && <RemoveImageButton/>}
                {!isBaseImage && <ReplaceImageButton/>}
                {eventContentType === 'edit' && <ResetEditButton/>}
                {(eventContentType === 'edit' || (eventContentType === 'new' && isCreated)) && <DisconnectButton/>}
            </div>
            <div className={'flex gap-3'}>
                <KeynoteButton />
                {eventContentType === 'edit' && <SaveEventButton/>}
            </div>
        </div>
    );
};

export default EventModalEditMenubar;
