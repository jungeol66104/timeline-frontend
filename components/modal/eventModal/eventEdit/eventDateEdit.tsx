import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {getTodayDate} from "@/utils/global";

const EventDateEdit = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const dateWithoutBCE = currentEventDraft.date.endsWith('BCE') ? currentEventDraft.date.slice(0, -4) : currentEventDraft.date

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: getTodayDate()})],
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
            <div className={`invisible w-fit text-md font-medium min-h-[24px] min-w-[94px]`}>{dateWithoutBCE}</div>
        </>
    );
};

export default EventDateEdit;
