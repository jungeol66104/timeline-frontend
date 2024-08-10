import React from 'react';
import SaveEventButton from "@/components/modals/eventModal/saveEventButton";
import NoteButton from "@/components/common/edit/noteButton";
import AddImageButton from "@/components/common/edit/addImageButton";
import {useSelector} from "react-redux";
import {selectModalContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import ResetEditButton from "@/components/common/edit/resetEditButton";
import {getIsBaseImage} from "@/utils/global";
import ReplaceImageButtonTest from "@/components/common/edit/replaceImageButtonTest";
import RemoveImageButtonTest from "@/components/common/edit/removeImageButtonTest";

const EventEditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const timelineType = useSelector(selectTimelineType)
    const modalContentType = useSelector(selectModalContentType)
    const isEventEditable = modalContentType === 'edit' || modalContentType === 'new'
    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isEventEditable && isBaseImage && <AddImageButton/>}
                {isEventEditable && !isBaseImage && <RemoveImageButtonTest/>}
                {isEventEditable && !isBaseImage && <ReplaceImageButtonTest/>}
            </div>
            <div className={'flex gap-3'}>
                <ResetEditButton/>
                {timelineType !== 'demo' && <NoteButton/>}
                <SaveEventButton/>
            </div>
        </div>
    );
};

export default EventEditMenubar;
