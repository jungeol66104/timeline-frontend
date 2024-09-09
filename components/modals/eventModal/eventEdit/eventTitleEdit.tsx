import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectEventContentType, selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents, updateCurrentEventDraft, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";

const EventTitleEdit = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const eventContentType = useSelector(selectEventContentType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: 'New Event Title'})],
        editorProps: {attributes: {class: 'outline-none text-2xl font-bold'}},
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEventDraft({...currentEventDraft, title: editor.getText()}))
            if (isCreated && eventContentType === 'new') dispatch(updateEventInCurrentEvents({...currentEventDraft, title: editor.getText()}))
        },
        content: `<p>${currentEventDraft.title}</p>`,
    }, [modalType])

    return (
        <>
            <div className={'absolute w-full'}><EditorContent editor={editor}/></div>
            <h1 className={`invisible min-h-[32px] text-2xl font-bold break-words`}>{currentEventDraft.title}</h1>
        </>
    );
};

export default EventTitleEdit;
