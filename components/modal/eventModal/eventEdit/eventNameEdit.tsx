import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const EventNameEdit = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: 'New Event Title'})],
        editorProps: {
            attributes: {class: 'outline-none text-2xl font-bold'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEventDraft({...currentEventDraft, name: editor.getText()}))
        },
        content: `<p>${currentEventDraft.name}</p>`,
    })

    return (
        <>
            <div className={'absolute pr-4'}><EditorContent editor={editor}/></div>
            <h1 className={`invisible w-fit text-2xl font-bold min-h-[32px]`}>{currentEventDraft.name}</h1>
        </>
    );
};

export default EventNameEdit;
