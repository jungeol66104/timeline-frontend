import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder'

const TimelineDescriptionEdit = () => {
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: 'New timeline description'})],
        editorProps: {
            attributes: {class: 'outline-none'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, description: editor.getText()}))
        },
        content: `<p>${currentTimelineDraft.description}</p>`,
    })

    useEffect(() => {
        if (editor && editor.getHTML() !== `<p>${currentTimelineDraft.description}</p>`) {
            editor.commands.setContent(`<p>${currentTimelineDraft.description}</p>`, false);
        }
    }, [currentTimelineDraft, editor]);

    return (
        <>
            <div className={'absolute'}><EditorContent editor={editor}/></div>
            <div className={`invisible w-fit text-md min-h-[24px]`}>{currentTimelineDraft.description}</div>
        </>
    );
};

export default TimelineDescriptionEdit;
