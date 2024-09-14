import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimelineDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import InformationModalImage from "@/components/modals/informationModal/informationView/informationModalImage";
import InformationModalEditMenubar from "@/components/modals/informationModal/informationEdit/informationModalEditMenubar";

import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from "@tiptap/extension-placeholder";

const InformationModalEdit = () => {
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({placeholder: "New timeline content"})],
        editorProps: {attributes: {class: 'outline-none'}},
        onUpdate: ({ editor }) => dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, content: editor.getHTML()})),
        content: `${currentTimelineDraft.content}`,
    })

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
