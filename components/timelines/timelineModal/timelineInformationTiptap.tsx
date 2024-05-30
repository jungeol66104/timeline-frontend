import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline, updateCurrentTimeline} from "@/store/slices/contentsSlice";
import {useEffect} from "react";

const TimelineInformationTiptap = () => {
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)

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
            dispatch(updateCurrentTimeline({...currentTimeline, content: editor.getText()}))
        },
        content: `<p>${currentTimeline.content}</p>`,
    })

    useEffect(() => {
        if (!editor) return

        editor.commands.setContent(`<p>${currentTimeline.content}</p>`)
    }, [currentTimeline])


    return (
        <EditorContent editor={editor} />
    )
}
export default TimelineInformationTiptap
