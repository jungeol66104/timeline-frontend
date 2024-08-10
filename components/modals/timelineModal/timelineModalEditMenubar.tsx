import React from 'react';
import NoteButton from "@/components/common/edit/noteButton";
import AddImageButton from "@/components/common/edit/addImageButton";
import SaveTimelineButton from "@/components/timelines/timelineEdit/saveTimelineButton";
import ResetEditButton from "@/components/common/edit/resetEditButton";
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";

const TimelineModalEditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const timelineType = useSelector(selectTimelineType)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <AddImageButton src={src} />
            <div className={'flex gap-3'}>
                <ResetEditButton />
                {timelineType !== 'demo' && <NoteButton/>}
                <SaveTimelineButton />
            </div>
        </div>
    );
};

export default TimelineModalEditMenubar;
