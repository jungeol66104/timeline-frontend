import React from 'react';
import SaveModalButton from "@/components/modal/saveModalButton";
import NoteButton from "@/components/modal/noteButton";
import AddImageButton from "@/components/common/addImageButton";

const EditMenubar = ({editor, src}:{editor: any, src: string}) => {
    return (
        <div className={'w-full flex justify-between pb-3'}>
            <AddImageButton src={src} />
            <div className={'flex gap-3'}>
                <NoteButton />
                <SaveModalButton/>
            </div>
        </div>
);
};

export default EditMenubar;
