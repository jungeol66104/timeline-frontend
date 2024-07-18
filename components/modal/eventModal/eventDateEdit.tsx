import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const EventDateEdit = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const editor = useEditor({
        extensions: [StarterKit, Image],
        editorProps: {
            attributes: {class: 'outline-none text-md font-medium'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEventDraft({...currentEventDraft, date: editor.getText()}))
        },
        content: `<p>${currentEventDraft.date}</p>`,
    })

    useEffect(() => {
        if (!editor) return

        editor.commands.setContent(`<p>${currentEventDraft.date}</p>`)
    }, [currentEventDraft])

    return (
        <div className={'absolute'}><EditorContent editor={editor}/></div>
    );
};

export default EventDateEdit;
