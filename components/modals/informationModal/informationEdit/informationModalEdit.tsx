import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import InformationModalImage from "@/components/modals/informationModal/informationView/informationModalImage";
import InformationModalEditMenubar from "@/components/modals/informationModal/informationEdit/informationModalEditMenubar";

import {useEditor, EditorContent} from '@tiptap/react'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from "@tiptap/extension-placeholder";
import NewInformationEditMenubar from "@/components/modals/informationModal/informationEdit/newInformationEditMenubar";

const InformationModalEdit = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [
            Document, Text, Paragraph,
            Link.configure({autolink: true, HTMLAttributes: {class: 'cursor-pointer text-blue-700 hover:underline',},}),
            Placeholder.configure({placeholder: "New timeline content"})
        ],
        editorProps: {attributes: {class: 'outline-none'}},
        onUpdate: ({ editor }) => dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, content: editor.getHTML()})),
        content: `${currentTimelineDraft.content}`,
    }, [modalType])

    return (
        <div className={'relative w-full flex flex-col items-center gap-3'}>
            {/*<InformationModalEditMenubar editor={editor} imagePath={currentTimelineDraft.imagePath!}/>*/}
            <hr className={'w-full'}/>
            <InformationModalImage information={currentTimelineDraft}/>
            <div className={'w-full'}><EditorContent editor={editor}/></div>
            <NewInformationEditMenubar/>
        </div>
    )
}
export default InformationModalEdit
