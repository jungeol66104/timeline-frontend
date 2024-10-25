import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import EventModalImage from "@/components/modals/eventModal/eventView/eventModalImage";

import {EditorContent, useEditor} from "@tiptap/react";
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import {selectModalType} from "@/store/slices/appearanceSlice";
import Link from "@tiptap/extension-link";
import NewEventEditMenubar from "@/components/modals/eventModal/eventEdit/newEventEditMenubar";

const EventView = () => {
    const modalType = useSelector(selectModalType)
    const currentEvent = useSelector(selectCurrentEvent)

    const editor = useEditor({
        extensions: [Document, Paragraph, Text, Link],
        editorProps: {attributes: {class: 'outline-none'}},
        content: `${currentEvent.content}`,
        editable: false
    }, [modalType])

    return (
        <div className={'relative w-full flex flex-col items-center gap-3'}>
            <hr className={'w-full'}/>
            <EventModalImage event={currentEvent}/>
            <div className={'w-full'}><EditorContent editor={editor}/></div>
            {/*<NewEventEditMenubar />*/}
        </div>
    )
}
export default EventView
