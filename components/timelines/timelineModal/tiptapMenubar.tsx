import React from 'react';
import SaveButton from "@/components/timelines/timelineModal/saveButton";

const TiptapMenubar = ({editor}:{editor: any}) => {

    const addImage = () => {
        if (!editor) return

        const url = window.prompt('URL')
        if (url) editor.chain().focus().setImage({ src: url }).run()
    }



    return (
        <div className={'tiptapMenubar sticky top-3 w-full flex justify-between py-3'}>
            <div className={`flex items-center h-[36px] border-[0.1px] border-gray-300 drop-shadow-sm rounded-md`}>
                <button className={'px-2 h-full flex items-center justify-center bg-white hover:bg-gray-100 border-r-[1px] border-gray-300'}><div className={'material-symbols-outlined text-[20px]'}>&#xe43e;</div></button>
                <button className={'px-2 h-full flex items-center justify-center bg-white hover:bg-gray-100'}><div className={'material-symbols-outlined text-[22px]'}>&#xf85d;</div></button>
            </div>
            <SaveButton/>
        </div>
);
};

export default TiptapMenubar;
