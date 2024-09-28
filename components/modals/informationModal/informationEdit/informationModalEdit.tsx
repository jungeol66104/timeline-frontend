import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import InformationModalImage from "@/components/modals/informationModal/informationView/informationModalImage";
import InformationModalEditMenubar from "@/components/modals/informationModal/informationEdit/informationModalEditMenubar";

import {useEditor, EditorContent} from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from "@tiptap/extension-placeholder";
import {selectModalType} from "@/store/slices/appearanceSlice";

const InformationModalEdit = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [Document, Text, Paragraph, Placeholder.configure({placeholder: "New timeline content"})],
        editorProps: {attributes: {class: 'outline-none'}},
        onUpdate: ({ editor }) => dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, content: editor.getHTML()})),
        content: `${currentTimelineDraft.content}`,
    }, [modalType])

    return (
        <div>
            <InformationModalEditMenubar editor={editor} imagePath={currentTimelineDraft.imagePath!}/>
            <hr/>
            <div className={'flex flex-col items-center gap-3'}>
                <InformationModalImage information={currentTimelineDraft} />
                <div className={'w-full'}><EditorContent editor={editor}/></div>
            </div>
        </div>
    )
}
export default InformationModalEdit
