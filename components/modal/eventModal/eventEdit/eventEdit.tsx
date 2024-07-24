import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import React, {useEffect} from "react";
import Image from "@tiptap/extension-image";
import EditMenubar from "@/components/modal/editMenubar";
import ModalEventImage from "@/components/modal/eventModal/modalEventImage";

const EventEdit = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const editor = useEditor({
        extensions: [StarterKit, Image],
        editorProps: {
          attributes: {class: 'w-full outline-none'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEventDraft({...currentEventDraft, description: editor.getText()}))
        },
        content: `<p>${currentEventDraft.description}</p>`,
    })

    useEffect(() => {
      if (!editor) return

        editor.commands.setContent(`<p>${currentEventDraft.description}</p>`)
    }, [currentEventDraft])

    return (
        <div>
            <EditMenubar editor={editor} src={'https://cdn.timeline.vg/base-image.png'}/>
            <hr/>
            <div className={'w-full flex flex-col items-center gap-3'}>
                <ModalEventImage src={currentEventDraft.image || 'https://cdn.timeline.vg/base-image.png'} alt={currentEventDraft.name} imageSize={currentEventDraft.imageSize}/>
                <div className={'w-full'}><EditorContent editor={editor}/></div>
            </div>
        </div>
    )
}
export default EventEdit
