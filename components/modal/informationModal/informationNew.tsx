import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import ModalEventImage from "@/components/modal/eventModal/modalEventImage";
import NewMenubar from "@/components/modal/newMenubar";

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
            <NewMenubar editor={editor} src={currentTimelineDraft.image}/>
            <hr/>
            <div className={'flex flex-col items-center gap-3'}>
                <ModalEventImage src={currentTimelineDraft.image} alt={currentTimelineDraft.name} imageSize={currentTimelineDraft.imageSize}/>
                <div className={'w-full'}><EditorContent editor={editor}/></div>
            </div>
        </div>
    )
}
export default InformationEdit
