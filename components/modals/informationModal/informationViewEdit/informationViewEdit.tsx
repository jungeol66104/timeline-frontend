import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectInformationContentType, selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline, selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import InformationModalImage from "@/components/modals/informationModal/informationViewEdit/informationModalImage";
import NewInformationEditMenubar from "@/components/modals/informationModal/informationViewEdit/newInformationEditMenubar";

import {useEditor, EditorContent} from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Link from '@tiptap/extension-link'
import Strike from "@tiptap/extension-strike";
import Placeholder from "@tiptap/extension-placeholder";

const InformationViewEdit = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const contentType = useSelector(selectInformationContentType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const timeline = contentType === 'view' ? currentTimeline : currentTimelineDraft

    const editor = useEditor({
        extensions: [
            Document, Paragraph, Text, Bold, Strike,
            Heading.configure({levels: [3], HTMLAttributes: {class: 'text-[22px] font-bold'}}),
            Link.configure({HTMLAttributes: {class: 'cursor-pointer text-blue-700 hover:underline'}}),
            Placeholder.configure({placeholder: "New timeline content"})
        ],
        editorProps: {attributes: {class: 'outline-none'}},
        onUpdate: ({ editor }) => dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, content: editor.getHTML()})),
        content: `${timeline.content}`,
        editable: contentType === 'edit' || contentType === 'new'
    }, [modalType, contentType])

    return (
        <div className={'relative w-full flex flex-col items-center gap-3'}>
            <hr className={'w-full'}/>
            <InformationModalImage information={timeline}/>
            <div className={'w-full'}><EditorContent editor={editor}/></div>
            {(contentType === 'edit' || contentType === 'new') && <NewInformationEditMenubar editor={editor}/>}
        </div>
    )
}
export default InformationViewEdit
