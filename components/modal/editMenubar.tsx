import React from 'react';
import SaveButton from "@/components/common/saveButton";
import CommentButton from "@/components/modal/commentButton";
import {getIsBaseImage} from "@/utils/global";

const EditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const isBaseImage = getIsBaseImage(src);

    const addImage = () => {
        if (!editor) return

        const url = window.prompt('URL')
        if (url) editor.chain().focus().setImage({ src: url }).run()
    }

    return (
        <div className={'tiptapMenubar w-full flex justify-between pb-3'}>
            <div className={`${!isBaseImage && 'invisible'} flex items-center h-[36px] border-[0.1px] border-gray-300 drop-shadow-sm rounded-md`}>
                <button className={'px-2 h-full flex items-center justify-center bg-white hover:bg-gray-100 rounded-md'}><div className={'material-symbols-outlined text-[22px]'}>&#xe43e;</div></button>
            </div>
            <div className={'flex gap-3'}>
                <CommentButton />
                <SaveButton/>
            </div>
        </div>
);
};

export default EditMenubar;
