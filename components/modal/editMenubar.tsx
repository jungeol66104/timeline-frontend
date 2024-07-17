import React from 'react';
import SaveButton from "@/components/common/saveButton";
import CommentButton from "@/components/modal/commentButton";
import {getIsBaseImage} from "@/utils/global";
import {useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";
import AddImageButton from "@/components/modal/addImageButton";

const EditMenubar = ({editor, src}:{editor: any, src: string}) => {
    return (
        <div className={'tiptapMenubar w-full flex justify-between pb-3'}>
            <AddImageButton src={src} />
            <div className={'flex gap-3'}>
                <CommentButton />
                <SaveButton/>
            </div>
        </div>
);
};

export default EditMenubar;
