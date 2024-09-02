import React from 'react';
import ShareButtonTemplate from "@/components/layout/popups/share/shareElementButtonTemplate";
import {useDispatch} from "react-redux";

const LinkCopyButton = () => {
    const dispatch = useDispatch()
    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            dispatch(updateIsShare())
        } catch (error) {
            console.error('Copy failed', error);
        }
    }

    return (
        <ShareButtonTemplate handleClick={handleClick} svgPath={'/svg/link.svg'} title={'Copy link'} />
    );
};

export default LinkCopyButton;
