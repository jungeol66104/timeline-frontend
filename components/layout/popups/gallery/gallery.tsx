import React from 'react';
import ReactDOM from 'react-dom';
import {useDispatch, useSelector} from "react-redux";
import {updateShowGallery} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import Image from "next/image";
import GalleryImage from "@/components/layout/popups/gallery/galleryImage";

const Gallery = () => {
    const dispatch = useDispatch();
    const currentTimeline = useSelector(selectCurrentTimeline);

    const portal = typeof window !== 'undefined' ? document.getElementById('portal') : null
    if (!portal) return

    return ReactDOM.createPortal(
        <div onClick={() => dispatch(updateShowGallery(false))} className={'gallery fixed top-0 left-0 w-full h-full flex items-center justify-center'} style={{zIndex: 5003}}>
            <GalleryImage information={currentTimeline} />
        </div>,
        portal
    );
};

export default Gallery;
