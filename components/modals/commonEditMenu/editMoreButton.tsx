import React, {useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectEditPopoverType, selectModalType, updateEditPopoverType} from "@/store/slices/appearanceSlice";

const EditMoreButton = () => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const editPopoverType = useSelector(selectEditPopoverType)

    const handleClick = (e: React.MouseEvent) => {
        const button = buttonRef.current
        const popover = typeof window !== 'undefined' ? document.querySelector(modalType === 'information' ? '.informationModal' : '.eventModal')?.querySelector('#editMorePopover') : null
        if (!button || !popover) return

        else {
            e.stopPropagation()
            dispatch(updateEditPopoverType('editMore'))

            document.addEventListener('click', function hideMenu(e: MouseEvent) {
                if (!button.contains(e.target as Node) && !popover.contains(e.target as Node)) {
                    if (editPopoverType !== 'editMore') return
                    dispatch(updateEditPopoverType('none'))
                    document.removeEventListener('click', hideMenu)
                }
            })
        }
    }

    return (
        <button ref={buttonRef} onClick={handleClick} className={`shrink-0 material-symbols-outlined text-[22px] w-9 h-9 bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md`}>&#xe5d3;</button>
    );
};

export default EditMoreButton;
