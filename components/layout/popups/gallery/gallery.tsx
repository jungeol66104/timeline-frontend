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
        <div className={'gallery fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center'} style={{zIndex: 5003}}>
            <div className={'px-3 w-full h-[60px] flex items-center justify-end'}><button onClick={() => dispatch(updateShowGallery(false))} className={'material-symbols-outlined text-[20px] text-white w-9 h-9 bg-black hover:bg-gray-700 opacity-70 rounded-full'}>&#xe5cd;</button></div>
            <GalleryImage information={currentTimeline}/>
            <div className={'w-full h-[45px] flex flex-col items-center opacity-70'}>
                {/*<div className={'text-md text-white line-clamp-1'}>{currentTimeline.title}</div>*/}
            </div>
        </div>,
        portal
    );
};

export default Gallery;
