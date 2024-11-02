import React, {useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, updateEditPopoverType} from "@/store/slices/appearanceSlice";
import { Editor } from '@tiptap/react';

const LinkButton = ({editor}: {editor: Editor | null}) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)

    const handleClick = (e: React.MouseEvent) => {
        editor?.chain().focus()

        const button = buttonRef.current
        const popover = typeof window !== 'undefined' ? document.querySelector(modalType === 'information' ? '.informationModal' : '.eventModal')?.querySelector('#linkPopover') : null
        if (!button || !popover) return

        if (editor?.getAttributes('link').href) editor?.commands.unsetLink()
        else {
            e.stopPropagation()
            dispatch(updateEditPopoverType('link'))

            document.addEventListener('click', function hideMenu (e: MouseEvent) {
                if (!button.contains(e.target as Node) && !popover.contains(e.target as Node)) {
                    dispatch(updateEditPopoverType('none'))
                    document.removeEventListener('click', hideMenu)
                }
            })
        }
    }

    return (
        <button ref={buttonRef} onClick={handleClick} className={`shrink-0 material-symbols-outlined text-[22px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe157;</button>
    );
};

export default LinkButton;
