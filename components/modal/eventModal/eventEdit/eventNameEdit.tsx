import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const EventNameEdit = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const editor = useEditor({
        extensions: [StarterKit, Image],
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
            <div className={'absolute'}><EditorContent editor={editor}/></div>
            <h1 className={`invisible w-fit text-2xl font-bold`}>{currentEventDraft.name}</h1>
        </>
    );
};

export default EventNameEdit;
