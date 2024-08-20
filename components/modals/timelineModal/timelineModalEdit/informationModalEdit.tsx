import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import InformationModalImage from "@/components/modals/timelineModal/timelineModalView/informationModalImage";
import Placeholder from "@tiptap/extension-placeholder";
import InformationModalEditMenubar from "@/components/modals/timelineModal/timelineModalEdit/informationModalEditMenubar";

const InformationModalEdit = () => {
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: "New timeline content"})],
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
            <InformationModalEditMenubar editor={editor} src={currentTimelineDraft.image}/>
            <hr/>
            <div className={'flex flex-col items-center gap-3'}>
                <InformationModalImage src={currentTimelineDraft.image} alt={currentTimelineDraft.name} imageSize={currentTimelineDraft.imageSize}/>
                <div className={'w-full'}><EditorContent editor={editor}/></div>
            </div>
        </div>
    )
}
export default InformationModalEdit
