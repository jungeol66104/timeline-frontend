import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from "@tiptap/extension-placeholder";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectEventContentType, selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents, updateCurrentEventDraft, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";
import EventModalEditMenubar from "@/components/modals/eventModal/eventEdit/eventModalEditMenubar";
import EventModalImage from "@/components/modals/eventModal/eventView/eventModalImage";

const EventModalEdit = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const eventContentType = useSelector(selectEventContentType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: 'New event content'})],
        editorProps: {attributes: {class: 'w-full outline-none'}},
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEventDraft({...currentEventDraft, content: editor.getText()}))
            if (isCreated && eventContentType === 'new') dispatch(updateEventInCurrentEvents({...currentEventDraft, content: editor.getText()}))
        },
        content: `<p>${currentEventDraft.content}</p>`,
    }, [modalType])

    return (
        <div>
            <EventModalEditMenubar editor={editor} imagePath={currentEventDraft.imagePath!}/>
            <hr/>
            <div className={'w-full flex flex-col items-center gap-3'}>
                <EventModalImage event={currentEventDraft}/>
                <div className={'w-full'}><EditorContent editor={editor}/></div>
            </div>
        </div>
    )
}

export default EventModalEdit;
