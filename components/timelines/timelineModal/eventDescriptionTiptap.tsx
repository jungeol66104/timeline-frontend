import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvent, updateCurrentEvent} from "@/store/slices/contentsSlice";
import {useEffect} from "react";

const EventDescriptionTiptap = () => {
    const dispatch = useDispatch()
    const currentEvent = useSelector(selectCurrentEvent)

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        editorProps: {
          attributes: {
              class: 'mt-3'
          }
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
        <EditorContent editor={editor} />
    )
}
export default EventDescriptionTiptap
