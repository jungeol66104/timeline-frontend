import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const EventDateEdit = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const dateWithoutBCE = currentEventDraft.date.endsWith('BCE') ? currentEventDraft.date.slice(0, -4) : currentEventDraft.date

    const editor = useEditor({
        extensions: [StarterKit, Image],
        editorProps: {
            attributes: {class: 'outline-none text-md font-medium'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEventDraft({...currentEventDraft, date: editor.getText()}))
        },
        content: `<p>${dateWithoutBCE}</p>`,
    })

    return (
        <>
            <div className={'absolute'}><EditorContent editor={editor}/></div>
            <div className={`invisible w-fit text-md font-medium`}>{dateWithoutBCE}</div>
        </>
    );
};

export default EventDateEdit;
