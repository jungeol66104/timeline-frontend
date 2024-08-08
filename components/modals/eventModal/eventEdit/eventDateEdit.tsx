import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
// @ts-ignore
import { Spice } from "timecraftjs";
import {transformDate, validateDate} from "@/utils/global";
import GuideButton from "@/components/common/guideButton";

const EventDateEdit = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const [spiceInstance, setSpiceInstance] = useState<any>(null);
    const [spiceError, setSpiceError] = useState(false);

    const editor = useEditor({
        content: `<p>${currentEventDraft.date}</p>`,
        extensions: [StarterKit, Placeholder.configure({placeholder: '0583-06-23 BCE'})],
        editorProps: {
            attributes: {class: 'outline-none text-md font-medium'},
            handleDOMEvents: {
                keydown: (view, event) => {
                    if (event.key === 'b' || event.key === 'B') {
                        event.preventDefault();
                        const { from, to } = view.state.selection;
                        const transaction = view.state.tr.insertText('BCE', from, to);
                        view.dispatch(transaction);
                        return true;
                    }
                    return false;
                }
            }
        },
        onUpdate: ({ editor }) => {
            const allowedCharacters = /^(?:[0-9\s-]|BCE)*$/;
            let content = editor.getText();

            if (allowedCharacters.test(content)) {
                if (validateDate(content)) {
                    try {
                        console.log(transformDate(content))
                        const ephemerisTime = spiceInstance.str2et(transformDate(content));
                        dispatch(updateCurrentEventDraft({ ...currentEventDraft, date: content, ephemerisTime: ephemerisTime}));
                        setSpiceError(false);

                    } catch {
                        dispatch(updateCurrentEventDraft({ ...currentEventDraft, date: content }));
                        setSpiceError(true);
                    }
                } else {
                    dispatch(updateCurrentEventDraft({ ...currentEventDraft, date: content }));
                    setSpiceError(true);
                }
            } else {
                editor.commands.deleteRange({
                    from: editor.state.selection.from - 1,
                    to: editor.state.selection.from,
                });
            }
        },
    })


    useEffect(() => {
        const initializeSpice = async () => {
            try {
                const spiceInstance = await new Spice().init();
                const kernelBuffer = await fetch("../kernels/naif0012.tls").then((res) => res.arrayBuffer())
                spiceInstance.loadKernel(kernelBuffer);
                setSpiceInstance(spiceInstance);
            } catch (error) {
                console.error('Error initializing Spice:', error);
            }
        };

        initializeSpice()
    }, []);

    return (
        <>
            <div className={'z-20 absolute'}><EditorContent editor={editor}/></div>
            <div className={`invisible w-fit text-md font-medium min-h-[24px] min-w-[100px]`}>{currentEventDraft.date}</div>
            <div className={'flex gap-2'}>
                <GuideButton type={'date'} />
                {spiceError && <div className={'flex items-center gap-1 text-red-700'}><span className={'material-symbols-outlined text-[12px]'}>&#xe000;</span><span className={'mt-[1px] text-[10px]'}>Keep YYYY-MM-DD BCE(optional) format.</span></div>}
            </div>
        </>
    );
};

export default EventDateEdit;
