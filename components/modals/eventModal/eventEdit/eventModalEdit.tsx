import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {selectCurrentEventDraft, selectCurrentEvents, updateCurrentEventDraft, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";
import EventModalEditMenubar from "@/components/modals/eventModal/eventEdit/eventModalEditMenubar";
import EventModalImage from "@/components/modals/eventModal/eventView/eventModalImage";
import Placeholder from "@tiptap/extension-placeholder";
import {selectEventContentType} from "@/store/slices/appearanceSlice";

const EventModalEdit = () => {
    const dispatch = useDispatch()
    const eventContentType = useSelector(selectEventContentType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: 'New event content'})],
        editorProps: {attributes: {class: 'w-full outline-none'}},
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEventDraft({...currentEventDraft, description: editor.getText()}))
            if (isCreated && eventContentType === 'new') dispatch(updateEventInCurrentEvents({...currentEventDraft, description: editor.getText()}))
        },
        content: `<p>${currentEventDraft.description}</p>`,
    })

    return (
        <div>
            <EventModalEditMenubar editor={editor} src={currentEventDraft.image || 'https://cdn.timeline.vg/base-image.png'}/>
            <hr/>
            <div className={'w-full flex flex-col items-center gap-3'}>
                <EventModalImage src={currentEventDraft.image || 'https://cdn.timeline.vg/base-image.png'} alt={currentEventDraft.name} imageSize={currentEventDraft.imageSize}/>
                <div className={'w-full'}><EditorContent editor={editor}/></div>
            </div>
        </div>
    )
}

export default EventModalEdit;
