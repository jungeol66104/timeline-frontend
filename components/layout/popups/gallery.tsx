import React from 'react';
import ReactDOM from 'react-dom';
import {useDispatch} from "react-redux";
import {updateShowGallery} from "@/store/slices/appearanceSlice";

const Gallery = () => {
    const dispatch = useDispatch();

    const portal = typeof window !== 'undefined' ? document.getElementById('portal') : null
    if (!portal) return

    return ReactDOM.createPortal(
        <div onClick={() => dispatch(updateShowGallery(false))} className={'gallery fixed top-0 left-0 w-full h-full'} style={{zIndex: 5003}}>

        </div>,
        portal
    );
};

export default Gallery;
