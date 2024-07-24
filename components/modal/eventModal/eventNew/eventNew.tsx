import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateNewEvent} from "@/store/slices/contentsSlice";
import React, {useEffect} from "react";
import Image from "@tiptap/extension-image";
import ModalImage from "@/components/modal/modalImage";
import NewMenubar from "@/components/modal/newMenubar";

const EventNew = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const editor = useEditor({
        extensions: [StarterKit, Image],
        editorProps: {
            attributes: {class: 'w-full outline-none'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateNewEvent({...currentEventDraft, description: editor.getText()}))
        },
        content: `<p>${currentEventDraft.description}</p>`,
    })

    useEffect(() => {
        if (!editor) return

        editor.commands.setContent(`<p>${currentEventDraft.description}</p>`)
    }, [currentEventDraft])

    return (
        <div>
            <NewMenubar editor={editor} src={'https://cdn.timeline.vg/base-image.png'}/>
            <hr/>
            <div className={'w-full flex flex-col items-center gap-3'}>
                <ModalImage src={currentEventDraft.image || 'https://cdn.timeline.vg/base-image.png'} alt={currentEventDraft.name} imageSize={currentEventDraft.imageSize}/>
                <div className={'w-full'}><EditorContent editor={editor}/></div>
            </div>
        </div>
    )
}
export default EventNew
