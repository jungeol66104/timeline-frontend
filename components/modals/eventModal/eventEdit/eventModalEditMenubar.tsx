import React from 'react';
import SaveEventButton from "@/components/modals/eventModal/eventEdit/saveEventButton";
import NoteButton from "@/components/common/edit/noteButton";
import AddImageButton from "@/components/common/edit/addImageButton";
import {useSelector} from "react-redux";
import {selectEventContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import ResetEditButton from "@/components/common/edit/resetEditButton";
import {getIsBaseImage} from "@/utils/global";
import ReplaceImageButtonTest from "@/components/common/edit/replaceImageButtonTest";
import RemoveImageButtonTest from "@/components/common/edit/removeImageButtonTest";

const EventModalEditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const timelineType = useSelector(selectTimelineType)
    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isBaseImage && <AddImageButton/>}
                {!isBaseImage && <RemoveImageButtonTest/>}
                {!isBaseImage && <ReplaceImageButtonTest/>}
            </div>
            <div className={'flex gap-3'}>
                <ResetEditButton/>
                <SaveEventButton/>
            </div>
        </div>
    );
};

export default EventModalEditMenubar;
