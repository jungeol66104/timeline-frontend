import React, {useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, updateEditPopoverType} from "@/store/slices/appearanceSlice";

const LinksButton = () => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)

    const handleClick = (e: React.MouseEvent) => {
        const button = buttonRef.current
        const popover = typeof window !== 'undefined' ? document.querySelector(modalType === 'information' ? '.informationModal' : '.eventModal')?.querySelector('#linksPopover') : null
        if (!button || !popover) return

        e.stopPropagation()
        dispatch(updateEditPopoverType('links'))

        document.addEventListener('click', function hideMenu(e: MouseEvent) {
            if (!button.contains(e.target as Node) && !popover.contains(e.target as Node)) {
                dispatch(updateEditPopoverType('none'))
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    return (
        <button ref={buttonRef} onClick={handleClick} className={`shrink-0 px-2.5 w-[100px] h-8 text-sm font-semibold hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md`}>Links</button>
    );
};

export default LinksButton;
