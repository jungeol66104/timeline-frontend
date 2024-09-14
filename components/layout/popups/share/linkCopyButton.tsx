import React from 'react';
import {useDispatch} from "react-redux";
import ShareButtonTemplate from "@/components/layout/popups/share/shareElementButtonTemplate";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const LinkCopyButton = () => {
    const dispatch = useDispatch()
    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            dispatch(updatePopupType('none'))
        } catch (error) {
            console.error('Copy failed', error);
        }
    }

    return (
        <ShareButtonTemplate handleClick={handleClick} svgPath={'/svg/link.svg'} title={'Copy link'} />
    );
};

export default LinkCopyButton;
