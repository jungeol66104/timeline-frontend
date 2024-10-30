import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectEventContentType, selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentEvent, selectCurrentEventDraft, selectCurrentEvents, updateCurrentEventDraft, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";
import EventModalImage from "@/components/modals/eventModal/eventViewEdit/eventModalImage";
import EventEditMenubar from "@/components/modals/eventModal/eventViewEdit/eventEditMenubar";

import {useEditor, EditorContent} from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Link from '@tiptap/extension-link'
import Strike from "@tiptap/extension-strike";
import Placeholder from "@tiptap/extension-placeholder";
import CustomLink from "@/utils/tiptap";

const EventViewEdit = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const contentType = useSelector(selectEventContentType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEvent = useSelector(selectCurrentEvent)
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const event = contentType === 'view' ? currentEvent : currentEventDraft

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    const editor = useEditor({
        extensions: [
            Document, Paragraph, Text, Bold, Strike,
            Heading.configure({levels: [3], HTMLAttributes: {class: 'text-[22px] font-bold'}}),
            // Link.extend({inclusive: false}).configure({defaultProtocol: 'https', HTMLAttributes: {class: 'cursor-pointer text-blue-700 hover:underline',},}),
            Placeholder.configure({placeholder: 'New event content'}),
            CustomLink
        ],
        editorProps: {attributes: {class: 'w-full outline-none'}},
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEventDraft({...currentEventDraft, content: editor.getHTML()}))
            if (contentType === 'new' && isCreated) dispatch(updateEventInCurrentEvents({...currentEventDraft, content: editor.getHTML()}))
        },
        content: `${event.content}`,
        editable: contentType === 'edit' || contentType === 'new'
    }, [modalType, contentType])

    return (
        <div className={'relative w-full flex flex-col items-center gap-3'}>
            <hr className={'w-full'}/>
            <EventModalImage event={event}/>
            <div className={'w-full'}><EditorContent editor={editor}/></div>
            {(contentType === 'edit' || contentType === 'new') && <EventEditMenubar editor={editor}/>}
        </div>
    )
}

export default EventViewEdit;
