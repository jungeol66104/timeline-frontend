import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {selectCurrentEventDraft, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import EditMenubar from "@/components/modal/editMenubar";
import EventModalImage from "@/components/modal/eventModal/eventModalImage";

const EventEdit = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const editor = useEditor({
        extensions: [StarterKit],
        editorProps: {
          attributes: {class: 'w-full outline-none'}
        },
        onUpdate: ({ editor }) => {
            dispatch(updateCurrentEventDraft({...currentEventDraft, description: editor.getText()}))
        },
        content: `<p>${currentEventDraft.description}</p>`,
    })

    return (
        <div>
            <EditMenubar editor={editor} src={'https://cdn.timeline.vg/base-image.png'}/>
            <hr/>
            <div className={'w-full flex flex-col items-center gap-3'}>
                <EventModalImage src={currentEventDraft.image || 'https://cdn.timeline.vg/base-image.png'} alt={currentEventDraft.name} imageSize={currentEventDraft.imageSize}/>
                <div className={'w-full'}><EditorContent editor={editor}/></div>
            </div>
        </div>
    )
}

export default EventEdit;
