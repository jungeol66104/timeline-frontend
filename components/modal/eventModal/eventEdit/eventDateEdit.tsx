import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const EventDateEdit = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const editor = useEditor({
        content: `<p>${currentEventDraft.date}</p>`,
        extensions: [StarterKit, Placeholder.configure({placeholder: '0583-06-23 BCE'})],
        editorProps: {
            attributes: {class: 'outline-none text-md font-medium'},
            handleDOMEvents: {
                keydown: (view, event) => {
                    if (event.key === 'b' || event.key === 'B') {
                        event.preventDefault();
                        const { from, to } = view.state.selection;
                        const transaction = view.state.tr.insertText('BCE', from, to);
                        view.dispatch(transaction);
                        return true;
                    }
                    return false;
                }
            }
        },
        onUpdate: ({ editor }) => {
            const allowedCharacters = /^[0-9 -bB]*$/;
            let content = editor.getText();

            console.log(allowedCharacters)
            console.log(content)
            console.log(allowedCharacters.test(content))
            if (allowedCharacters.test(content)) {
                dispatch(updateCurrentEventDraft({ ...currentEventDraft, date: content }));

            } else {
                editor.commands.deleteRange({
                    from: editor.state.selection.from - 1,
                    to: editor.state.selection.from,
                });
            }
        },
    })

    return (
        <>
            <div className={'z-20 absolute'}><EditorContent editor={editor}/></div>
            <div className={`invisible w-fit text-md font-medium min-h-[24px] min-w-[100px]`}>{currentEventDraft.date}</div>
            <div className={'text-[10px] text-red-700'}>Digits, dash, BCE allowed.</div>
        </>
    );
};

export default EventDateEdit;
