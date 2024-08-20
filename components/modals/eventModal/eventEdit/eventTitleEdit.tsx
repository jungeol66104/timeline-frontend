import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, selectCurrentEvents, updateCurrentEventDraft, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";
import {selectEventContentType} from "@/store/slices/appearanceSlice";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const EventTitleEdit = () => {
    const dispatch = useDispatch()
    const eventContentType = useSelector(selectEventContentType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: 'New Event Title'})],
        editorProps: {attributes: {class: 'outline-none text-2xl font-bold'}},
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEventDraft({...currentEventDraft, name: editor.getText()}))
            if (isCreated && eventContentType === 'new') dispatch(updateEventInCurrentEvents({...currentEventDraft, name: editor.getText()}))
        },
        content: `<p>${currentEventDraft.name}</p>`,
    }, [currentEventDraft.name])

    return (
        <>
            <div className={'absolute w-full'}><EditorContent editor={editor}/></div>
            <h1 className={`invisible min-h-[32px] text-2xl font-bold break-words`}>{currentEventDraft.name}</h1>
        </>
    );
};

export default EventTitleEdit;
