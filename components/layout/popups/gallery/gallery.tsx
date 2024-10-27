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
        <div className={'gallery fixed top-0 left-0 w-full h-full flex items-center justify-center'} style={{zIndex: 5003}}>
            <GalleryImage information={currentTimeline}/>
            <button onClick={() => dispatch(updateShowGallery(false))} className={'material-symbols-outlined text-[20px] text-white z-10 absolute bottom-3 left-1/2 transform -translate-x-1/2 px-2 h-[36px] bg-black hover:bg-gray-700 opacity-70 rounded-2xl shrink-0 '}>&#xe5cd;</button>
        </div>,
        portal
    );
};

export default Gallery;
