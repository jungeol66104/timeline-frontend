import React from 'react';
import SaveEventButton from "@/components/modals/eventModal/saveEventButton";
import NoteButton from "@/components/common/noteButton";
import AddImageButton from "@/components/common/addImageButton";
import {useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";

const EditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const modalType = useSelector(selectModalType)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <AddImageButton src={src} />
            {modalType === 'event' &&
                <div className={'flex gap-3'}>
                    <NoteButton />
                    <SaveEventButton/>
                </div>
            }
        </div>
    );
};

export default EditMenubar;
