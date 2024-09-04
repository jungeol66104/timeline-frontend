import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";

const InformationTitleEdit = () => {
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: 'New Timeline Title'})],
        editorProps: {attributes: {class: 'outline-none text-2xl font-bold'}},
        onUpdate: ({ editor }) => dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, name: editor.getText()})),
        content: `<p>${currentTimelineDraft.title}</p>`,
    })

    useEffect(() => {
        if (editor && editor.getHTML() !== `<p>${currentTimelineDraft.title}</p>`) {
            editor.commands.setContent(`<p>${currentTimelineDraft.title}</p>`, false);
        }
    }, [currentTimelineDraft, editor]);

    return (
        <>
            <div className={'absolute w-full'}><EditorContent editor={editor}/></div>
            <h1 className={`invisible min-h-[32px] text-2xl font-bold break-words`}>{currentTimelineDraft.title}</h1>
        </>
    );
};

export default InformationTitleEdit;
