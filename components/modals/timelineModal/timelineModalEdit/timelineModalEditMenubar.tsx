import React from 'react';
import NoteButton from "@/components/common/edit/noteButton";
import AddImageButton from "@/components/common/edit/addImageButton";
import ResetEditButton from "@/components/common/edit/resetEditButton";
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";
import {getIsBaseImage} from "@/utils/global";
import RemoveImageButton from "@/components/common/edit/removeImageButton";
import ReplaceImageButton from "@/components/common/edit/replaceImageButton";
import SaveInformationButton from "@/components/modals/timelineModal/timelineModalEdit/saveInformationButton";

const TimelineModalEditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const timelineType = useSelector(selectTimelineType)
    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isBaseImage && <AddImageButton/>}
                {!isBaseImage && <RemoveImageButton />}
                {!isBaseImage && <ReplaceImageButton />}
                {timelineType !== 'new' && <ResetEditButton />}
            </div>
            <div className={'flex gap-3'}>
                {timelineType !== 'new' && <SaveInformationButton/>}
            </div>
        </div>
    );
};

export default TimelineModalEditMenubar;
