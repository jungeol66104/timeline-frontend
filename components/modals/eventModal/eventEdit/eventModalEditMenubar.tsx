import React from 'react';
import SaveEventButton from "@/components/modals/eventModal/eventEdit/saveEventButton";
import NoteButton from "@/components/common/edit/noteButton";
import AddImageButton from "@/components/common/edit/addImageButton";
import {useSelector} from "react-redux";
import {selectEventContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import ResetEditButton from "@/components/common/edit/resetEditButton";
import {getIsBaseImage} from "@/utils/global";
import ReplaceImageButton from "@/components/common/edit/replaceImageButton";
import RemoveImageButton from "@/components/common/edit/removeImageButton";
import DisconnectButton from "@/components/modals/eventModal/eventEdit/disconnectButton";
import KeynoteButton from "@/components/modals/eventModal/eventEdit/keynoteButton";

const EventModalEditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const eventContentType = useSelector(selectEventContentType)

    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isBaseImage && <AddImageButton/>}
                {!isBaseImage && <RemoveImageButton/>}
                {!isBaseImage && <ReplaceImageButton/>}
                {eventContentType === 'edit' && <ResetEditButton/>}
                {eventContentType === 'edit' && <DisconnectButton/>}
            </div>
            <div className={'flex gap-3'}>
                <KeynoteButton />
                {eventContentType === 'edit' && <SaveEventButton/>}
            </div>
        </div>
    );
};

export default EventModalEditMenubar;
