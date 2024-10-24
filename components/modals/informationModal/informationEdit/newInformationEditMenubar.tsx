import React from 'react';
import SaveInformationButton from "@/components/modals/informationModal/informationEdit/saveInformationButton";

import {Editor} from "@tiptap/core";

const NewInformationEditMenubar = ({editor}: {editor: Editor | null}) => {
    return (
        <div className={'sticky bottom-3 w-full h-[36px] flex items-center justify-between'}>
            <div className={'p-0.5 flex items-center gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md'}>
                {/* image */}
                <button className={`material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe43e;</button>
                {/* youtube */}
                <button className={`pt-[1px] material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xf85a;</button>

                {/* heading */}
                <button className={`material-symbols-outlined text-[25px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xf018;</button>
                {/* table */}
                <button className={`material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xf191;</button>
                {/* list */}
                <button className={`material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe241;</button>

                {/* link */}
                <button className={`material-symbols-outlined text-[22px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe178;</button>
                {/* bold */}
                <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`material-symbols-outlined text-[22px] w-9 h-8 rounded-md ${editor?.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>&#xe238;</button>
                {/* strike */}
                <button onClick={() => editor?.chain().focus().toggleStrike().run()} className={`material-symbols-outlined text-[20px] w-9 h-8 rounded-md ${editor?.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>&#xe257;</button>
            </div>
            <SaveInformationButton/>
        </div>
    );
};

export default NewInformationEditMenubar;