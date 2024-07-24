import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import NewMenubar from "@/components/modal/newMenubar";
import TimelineModalImage from "@/components/modal/informationModal/timelineModalImage";

const InformationNew = () => {
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
            <NewMenubar editor={editor} src={currentTimelineDraft.image}/>
            <hr/>
            <div className={'flex flex-col items-center gap-3'}>
                <TimelineModalImage src={currentTimelineDraft.image} alt={currentTimelineDraft.name} imageSize={currentTimelineDraft.imageSize}/>
                <div className={'w-full'}><EditorContent editor={editor}/></div>
            </div>
        </div>
    )
}
export default InformationNew
