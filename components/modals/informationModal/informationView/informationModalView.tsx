import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import InformationModalImage from "@/components/modals/informationModal/informationView/informationModalImage";

import {EditorContent, useEditor} from "@tiptap/react";
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import {selectModalType} from "@/store/slices/appearanceSlice";
import Links from "@/components/modals/links";

const InformationModalView = () => {
    const modalType = useSelector(selectModalType)
    const currentTimeline = useSelector(selectCurrentTimeline)

    const editor = useEditor({
        extensions: [Document, Paragraph, Text, Link],
        editorProps: {attributes: {class: 'outline-none'}},
        content: `${currentTimeline.content}`,
        editable: false
    }, [modalType])

    return (
        <div className={'relative w-full flex flex-col items-center gap-3'}>
            <hr className={'w-full'}/>
            <div className={'w-full flex items-center justify-center'}><InformationModalImage information={currentTimeline}/></div>
            <div className={'w-full'}><EditorContent editor={editor}/></div>
        </div>
    );
};

export default InformationModalView;
