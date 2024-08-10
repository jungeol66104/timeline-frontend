import React from 'react';
import SaveEventButton from "@/components/modals/eventModal/saveEventButton";
import NoteButton from "@/components/common/edit/noteButton";
import AddImageButton from "@/components/common/edit/addImageButton";
import {useSelector} from "react-redux";
import {selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";
import ResetEditButton from "@/components/common/edit/resetEditButton";

const EventEditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const timelineType = useSelector(selectTimelineType)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <AddImageButton src={src}/>
            <div className={'flex gap-3'}>
                <ResetEditButton/>
                {timelineType !== 'demo' && <NoteButton/>}
                <SaveEventButton/>
            </div>
        </div>
    );
};

export default EventEditMenubar;
