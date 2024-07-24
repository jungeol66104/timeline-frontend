import React, {useEffect} from 'react';
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {useDispatch, useSelector} from "react-redux";

const TimelineDescriptionEdit = () => {
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [StarterKit, Image],
        editorProps: {
            attributes: {class: 'outline-none'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, description: editor.getText()}))
        },
        content: `<p>${currentTimelineDraft.description}</p>`,
    })

    useEffect(() => {
        if (!editor) return

        editor.commands.setContent(`<p>${currentTimelineDraft.description}</p>`)
    }, [currentTimelineDraft])

    return (
        <>
            <div className={'absolute'}><EditorContent editor={editor}/></div>
            <div className={`invisible w-fit text-md min-h-[24px]`}>{currentTimelineDraft.description}</div>
        </>
    );
};

export default TimelineDescriptionEdit;
