import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectEventContentType, selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents, updateCurrentEventDraft, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";
import EventModalImage from "@/components/modals/eventModal/eventView/eventModalImage";
import NewEventEditMenubar from "@/components/modals/eventModal/eventEdit/newEventEditMenubar";

import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from "@tiptap/extension-placeholder";

const EventEdit = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const eventContentType = useSelector(selectEventContentType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    const editor = useEditor({
        extensions: [
            Document, Text, Paragraph,
            Link.configure({autolink: true, HTMLAttributes: {class: 'cursor-pointer text-blue-700 hover:underline',},}),
            Placeholder.configure({placeholder: 'New event content'})],
        editorProps: {attributes: {class: 'w-full outline-none'}},
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEventDraft({...currentEventDraft, content: editor.getHTML()}))
            if (eventContentType === 'new' && isCreated) dispatch(updateEventInCurrentEvents({...currentEventDraft, content: editor.getHTML()}))
        },
        content: `${currentEventDraft.content}`,
    }, [modalType])

    return (
        <div className={'relative w-full flex flex-col items-center gap-3'}>
            <hr className={'w-full'}/>
            <EventModalImage event={currentEventDraft}/>
            <div className={'w-full'}><EditorContent editor={editor}/></div>
            <NewEventEditMenubar />
        </div>
    )
}

export default EventEdit;
