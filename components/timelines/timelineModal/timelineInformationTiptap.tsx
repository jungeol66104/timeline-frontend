import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline, updateCurrentTimeline} from "@/store/slices/contentsSlice";
import React, {useEffect} from "react";
import ContributionButton from "@/components/timelines/timelineModal/contributionButton";
import EditButton from "@/components/timelines/timelineModal/editButton";

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
        <div>
            <div className={'tiptapMenubar sticky top-3 w-full flex justify-between py-3'}>
                <ContributionButton/>
                <EditButton/>
            </div>
            <hr/>
            <EditorContent editor={editor}/>
        </div>
    )
}
export default TimelineInformationTiptap
