import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import EditMenubar from "@/components/modal/editMenubar";
import ModalImage from "@/components/modal/modalImage";

const InformationEdit = () => {
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [StarterKit, Image],
        editorProps: {
            attributes: {class: 'outline-none'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, content: editor.getText()}))
        },
        content: `<p>${currentTimelineDraft.content}</p>`,
    })

    useEffect(() => {
        if (!editor) return

        editor.commands.setContent(`<p>${currentTimelineDraft.content}</p>`)
    }, [currentTimelineDraft])

    return (
        <div>
            <EditMenubar editor={editor} src={currentTimelineDraft.image}/>
            <hr/>
            <div className={'flex flex-col items-center gap-3'}>
                <ModalImage src={currentTimelineDraft.image} alt={currentTimelineDraft.name} imageSize={currentTimelineDraft.imageSize} />
                <EditorContent editor={editor}/>
            </div>
        </div>
    )
}
export default InformationEdit
