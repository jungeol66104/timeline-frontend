import {getIsBaseImage} from "@/utils/global";
import React from 'react';
import {useSelector} from "react-redux";
import {selectEventContentType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents} from "@/store/slices/contentsSlice";
import AddImageButton from "@/components/common/addImageButton";
import ImageEditButton from "@/components/common/imageEditButton";
import ResetEditButton from "@/components/modals/resetEditButton";
import DetachButton from "@/components/modals/eventModal/eventViewEdit/editMenu/detachButton";
import KeynoteButton from "@/components/modals/eventModal/eventViewEdit/editMenu/keynoteButton";
import SaveEventButton from "@/components/modals/eventModal/eventViewEdit/editMenu/saveEventButton";

const EventModalEditMenubar = ({editor, imagePath}:{editor: any, imagePath: string}) => {
    const eventContentType = useSelector(selectEventContentType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    const isBaseImage = getIsBaseImage(imagePath)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isBaseImage && <AddImageButton/>}
                {!isBaseImage && <ImageEditButton/>}
                {eventContentType === 'edit' && <ResetEditButton/>}
                {(eventContentType === 'edit' || (eventContentType === 'new' && isCreated)) && <DetachButton/>}
            </div>
            <div className={'flex gap-3'}>
                <KeynoteButton />
                {eventContentType === 'edit' && <SaveEventButton/>}
            </div>
        </div>
    );
};

export default EventModalEditMenubar;
