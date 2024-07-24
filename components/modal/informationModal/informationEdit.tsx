import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import EditMenubar from "@/components/modal/editMenubar";
import EventModalImage from "@/components/modal/eventModal/eventModalImage";

const InformationEdit = () => {
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [StarterKit],
        editorProps: {
            attributes: {class: 'outline-none'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, content: editor.getText()}))
        },
        content: `<p>${currentTimelineDraft.content}</p>`,
    })

    return (
        <div>
            <EditMenubar editor={editor} src={currentTimelineDraft.image}/>
            <hr/>
            <div className={'flex flex-col items-center gap-3'}>
                <EventModalImage src={currentTimelineDraft.image} alt={currentTimelineDraft.name} imageSize={currentTimelineDraft.imageSize}/>
                <div className={'w-full'}><EditorContent editor={editor}/></div>
            </div>
        </div>
    )
}
export default InformationEdit
