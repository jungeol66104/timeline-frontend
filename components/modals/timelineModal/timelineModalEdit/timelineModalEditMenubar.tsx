import React from 'react';
import NoteButton from "@/components/common/edit/noteButton";
import AddImageButton from "@/components/common/edit/addImageButton";
import ResetEditButton from "@/components/common/edit/resetEditButton";
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";
import {getIsBaseImage} from "@/utils/global";
import RemoveImageButtonTest from "@/components/common/edit/removeImageButtonTest";
import ReplaceImageButtonTest from "@/components/common/edit/replaceImageButtonTest";
import SaveTimelineButton from "@/components/modals/timelineModal/timelineModalEdit/saveTimelineButton";

const TimelineModalEditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const timelineType = useSelector(selectTimelineType)
    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isBaseImage && <AddImageButton/>}
                {!isBaseImage && <RemoveImageButtonTest />}
                {!isBaseImage && <ReplaceImageButtonTest />}
                {timelineType !== 'new' && <ResetEditButton />}
            </div>
            <div className={'flex gap-3'}>
                {timelineType !== 'new' && <SaveTimelineButton/>}
            </div>
        </div>
    );
};

export default TimelineModalEditMenubar;
