import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder'
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";

const InformationDescriptionEdit = () => {
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: 'New timeline description'})],
        editorProps: {attributes: {class: 'outline-none'}},
        onUpdate: ({ editor }) => dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, description: editor.getText()})),
        content: `<p>${currentTimelineDraft.description}</p>`,
    })

    useEffect(() => {
        if (editor && editor.getHTML() !== `<p>${currentTimelineDraft.description}</p>`) {
            editor.commands.setContent(`<p>${currentTimelineDraft.description}</p>`, false);
        }
    }, [currentTimelineDraft, editor]);

    return (
        <>
            <div className={'absolute w-full'}><EditorContent editor={editor}/></div>
            <div className={`invisible min-h-[24px] text-md break-words`}>{currentTimelineDraft.description}</div>
        </>
    );
};

export default InformationDescriptionEdit;
