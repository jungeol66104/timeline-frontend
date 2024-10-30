import React from 'react';
import {Editor} from "@tiptap/core";
import LinkPopover from "@/components/modals/eventModal/eventViewEdit/editMenu/linkPopover";

const EditPopovers = ({editor}: {editor: Editor | null}) => {
    return (
        <div className={'absolute left-0 bottom-[38px]'}>
            <LinkPopover editor={editor} />
        </div>
    );
};

export default EditPopovers;
