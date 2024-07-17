import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvent, updateCurrentEvent} from "@/store/slices/contentsSlice";
import React, {useEffect} from "react";
import Image from "@tiptap/extension-image";
import EditMenubar from "@/components/modal/editMenubar";

const EventEdit = () => {
    const dispatch = useDispatch()
    const currentEvent = useSelector(selectCurrentEvent)

    const editor = useEditor({
        extensions: [StarterKit, Image],
        editorProps: {
          attributes: {class: ''}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEvent({...currentEvent, description: editor.getText()}))
        },
        content: `<p>${currentEvent.description}</p>`,
    })

    useEffect(() => {
      if (!editor) return

        editor.commands.setContent(`<p>${currentEvent.description}</p>`)
    }, [currentEvent])


    return (
        <div className={'flex flex-col gap-3'}>
            <EditMenubar editor={editor} src={'https://cdn.timeline.vg/base-image.png'}/>
            <hr/>
            <EditorContent editor={editor}/>
        </div>
    )
}
export default EventEdit
