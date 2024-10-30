import React, {useLayoutEffect, useRef, useState} from 'react';
import {Editor} from "@tiptap/core";
import {updateSearchValue} from "@/store/slices/searchSlice";
import {useDispatch} from "react-redux";
import {updateEditPopoverType} from "@/store/slices/appearanceSlice";

const LinkButton = () => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const dispatch = useDispatch()

    const handleClick = (e: React.MouseEvent) => {
        const button = buttonRef.current
        if (!button) return

        e.stopPropagation()
        dispatch(updateEditPopoverType('link'))

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!button.contains(e.target as Node)) {
                dispatch(updateEditPopoverType('none'))
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    // useLayoutEffect(() => {
    //     if (isShow) {
    //         const button = buttonRef.current
    //         const menu = menuRef.current
    //         const editMenubar = button?.closest('.editMenubar')
    //         if (!button || !menu || !editMenubar) return
    //
    //         const buttonRect = button.getBoundingClientRect()
    //         const menuRect = menu.getBoundingClientRect()
    //         const editMenubarRect = editMenubar.getBoundingClientRect()
    //
    //         if (menuRect.left - editMenubarRect.left < 0) {
    //             menu.style.left = '0';
    //             menu.style.right = 'auto';
    //             menu.style.transform = `translateX(${-buttonRect.left}px)`;
    //         } else if (menuRect.right - editMenubarRect.right > 0) {
    //             menu.style.left = 'auto';
    //             menu.style.right = '0';
    //             menu.style.transform = `translateX(${editMenubarRect.right - buttonRect.right}px)`;
    //         }
    //     }
    // }, [isShow]);

    return (
        <button ref={buttonRef} onClick={handleClick} className={`shrink-0 material-symbols-outlined text-[22px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe157;</button>
    );
};

export default LinkButton;
