import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import InformationModalImage from "@/components/modals/informationModal/informationView/informationModalImage";
import NewInformationEditMenubar from "@/components/modals/informationModal/informationEdit/newInformationEditMenubar";

import {useEditor, EditorContent} from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Link from '@tiptap/extension-link'
import Strike from "@tiptap/extension-strike";
import Placeholder from "@tiptap/extension-placeholder";

const InformationEdit = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [
            Document, Paragraph, Text, Bold, Strike,
            Link.configure({HTMLAttributes: {class: 'cursor-pointer text-blue-700 hover:underline'}}),
            Placeholder.configure({placeholder: "New timeline content"})
        ],
        editorProps: {attributes: {class: 'outline-none'}},
        onUpdate: ({ editor }) => dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, content: editor.getHTML()})),
        content: `${currentTimelineDraft.content}`,
    }, [modalType])

    return (
        <div className={'relative w-full flex flex-col items-center gap-3'}>
            <hr className={'w-full'}/>
            <InformationModalImage information={currentTimelineDraft}/>
            <div className={'w-full'}><EditorContent editor={editor}/></div>
            <NewInformationEditMenubar editor={editor}/>
        </div>
    )
}
export default InformationEdit
