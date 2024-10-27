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
            <div className={'px-3 w-full h-[60px] flex items-center justify-end'}>
                <button onClick={() => dispatch(updateShowGallery(false))}
                        className={'material-symbols-outlined text-[20px] text-white w-9 h-9 bg-black hover:bg-gray-700 opacity-70 rounded-full'}>&#xe5cd;</button>
            </div>
            <GalleryImage information={currentTimeline}/>
            <div className={'px-3 w-full h-[60px] flex items-center justify-center opacity-70'}>
                <div className={`flex gap-2.5`}>
                    <button className={`material-symbols-outlined text-[20px] text-white flex items-center justify-center w-[30px] h-[30px] rounded-full border-[0.1px] border-gray-700 bg-black hover:bg-gray-700`}>&#xe5cb;</button>
                    <button className={`material-symbols-outlined text-[20px] text-white flex items-center justify-center w-[30px] h-[30px] rounded-full border-[0.1px] border-gray-700 bg-black hover:bg-gray-700`}>&#xe5cc;</button>
                </div>
            </div>
        </div>,
        portal
    );
};

export default Gallery;
