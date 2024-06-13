import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import {selectCurrentTimeline, updateCurrentTimeline} from "@/store/slices/contentsSlice";
import EditMenubar from "@/components/modal/editMenubar";

const InformationEdit = () => {
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)

    const editor = useEditor({
        extensions: [StarterKit, Image],
        editorProps: {
            attributes: {class: 'mt-3'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentTimeline({...currentTimeline, content: editor.getText()}))
        },
        content: `<p>${currentTimeline.content}</p>`,
    })

    useEffect(() => {
        if (!editor) return

        editor.commands.setContent(`<p>${currentTimeline.content}</p>`)
    }, [currentTimeline])

    return (
        <div>
            <EditMenubar editor={editor} />
            <hr/>
            <EditorContent editor={editor}/>
        </div>
    )
}
export default InformationEdit
