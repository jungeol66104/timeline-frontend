import React from 'react';
import ShareButtonTemplate from "@/components/layout/share/shareElementButtonTemplate";
import {useDispatch} from "react-redux";
import {updateIsShare} from "@/store/slices/appearanceSlice";

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
        <ShareButtonTemplate handleClick={handleClick} svgPath={'/svg/link.svg'} title={'링크 복사'} />
    );
};

export default LinkCopyButton;
