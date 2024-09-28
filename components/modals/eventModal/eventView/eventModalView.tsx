import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import EventModalImage from "@/components/modals/eventModal/eventView/eventModalImage";

import {EditorContent, useEditor} from "@tiptap/react";
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import {selectModalType} from "@/store/slices/appearanceSlice";

const EventModalView = () => {
    const modalType = useSelector(selectModalType)
    const currentEvent = useSelector(selectCurrentEvent)

    const editor = useEditor({
        extensions: [Document, Text, Paragraph],
        editorProps: {attributes: {class: 'outline-none'}},
        content: `${currentEvent.content}`,
        editable: false
    }, [modalType])

    return (
        <div>
            <hr/>
            <div className={'w-full flex flex-col items-center gap-3'}>
                <EventModalImage event={currentEvent}/>
                <div className={'w-full'}><EditorContent editor={editor}/></div>
                {/*<p className={'mt-3 w-full'}>{unwrapPTag(currentEvent.content)}</p>*/}
            </div>
        </div>
    )
}
export default EventModalView
