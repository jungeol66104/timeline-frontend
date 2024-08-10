import React from 'react';
import NoteButton from "@/components/common/edit/noteButton";
import AddImageButton from "@/components/common/edit/addImageButton";
import SaveTimelineButton from "@/components/timelines/timelineEdit/saveTimelineButton";
import ResetEditButton from "@/components/common/edit/resetEditButton";
import {useSelector} from "react-redux";
import {selectTimelineContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import {getIsBaseImage} from "@/utils/global";
import RemoveImageButtonTest from "@/components/common/edit/removeImageButtonTest";
import ReplaceImageButtonTest from "@/components/common/edit/replaceImageButtonTest";

const TimelineModalEditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const timelineType = useSelector(selectTimelineType)
    const timelineContentType = useSelector(selectTimelineContentType)
    const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'
    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isTimelineEditable && isBaseImage && <AddImageButton/>}
                {isTimelineEditable && !isBaseImage && <RemoveImageButtonTest />}
                {isTimelineEditable && !isBaseImage && <ReplaceImageButtonTest />}
            </div>
            <div className={'flex gap-3'}>
                <ResetEditButton />
                {timelineType !== 'demo' && <NoteButton/>}
                <SaveTimelineButton />
            </div>
        </div>
    );
};

export default TimelineModalEditMenubar;
