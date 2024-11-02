import React from 'react';
import {Editor} from "@tiptap/core";
import LinkPopover from "@/components/modals/commonEditMenu/linkPopover";
import EditMorePopover from "@/components/modals/commonEditMenu/editMorePopover";

const EditPopovers = ({editor}: {editor: Editor | null}) => {
    return (
        <div className={'absolute left-0 bottom-[38px] w-full'}>
            <LinkPopover editor={editor}/>
            <EditMorePopover/>
        </div>
    );
};

export default EditPopovers;
