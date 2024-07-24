import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const TimelineNameEdit = () => {
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: 'New Timeline Title'})],
        editorProps: {
            attributes: {class: 'outline-none text-2xl font-bold'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, name: editor.getText()}))
        },
        content: `<p>${currentTimelineDraft.name}</p>`,
    })

    useEffect(() => {
        if (editor && editor.getHTML() !== `<p>${currentTimelineDraft.name}</p>`) {
            editor.commands.setContent(`<p>${currentTimelineDraft.name}</p>`, false);
        }
    }, [currentTimelineDraft, editor]);

    return (
        <>
            <div className={'absolute'}><EditorContent editor={editor}/></div>
            <h1 className={`timelineInformationName invisible w-fit text-2xl font-bold min-h-[32px]`}>{currentTimelineDraft.name}</h1>
        </>
    );
};

export default TimelineNameEdit;
