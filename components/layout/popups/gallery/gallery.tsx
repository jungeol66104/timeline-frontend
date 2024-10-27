import React from 'react';
import ReactDOM from 'react-dom';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, updateShowGallery} from "@/store/slices/appearanceSlice";
import {selectCurrentEvent, selectCurrentTimeline} from "@/store/slices/contentsSlice";
import GalleryImage from "@/components/layout/popups/gallery/galleryImage";

const Gallery = () => {
    const dispatch = useDispatch();
    const modalType = useSelector(selectModalType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvent = useSelector(selectCurrentEvent)
    const imageTarget = modalType === 'information' ? currentTimeline : currentEvent


    const portal = typeof window !== 'undefined' ? document.getElementById('portal') : null
    if (!portal) return

    return ReactDOM.createPortal(
        <div className={'gallery fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center'} style={{zIndex: 5003}}>
            <div className={'px-3 w-full h-[60px] flex items-center justify-end'}>
                <button onClick={() => dispatch(updateShowGallery(false))}
                        className={'material-symbols-outlined text-[20px] text-white w-9 h-9 bg-black hover:bg-gray-700 opacity-70 rounded-full'}>&#xe5cd;</button>
            </div>
            <GalleryImage imageTarget={imageTarget}/>
            <div className={'px-3 w-full h-[60px] flex items-center justify-center opacity-70'}>
                {/*<div className={`flex items-center gap-2.5`}>*/}
                {/*    <button className={`material-symbols-outlined text-[20px] text-white text-center w-[30px] h-[30px] rounded-full border-[0.1px] border-gray-700 bg-black hover:bg-gray-700`}>&#xe5cb;</button>*/}
                {/*    <span className={'text-white'}>1 / 33</span>*/}
                {/*    <button className={`material-symbols-outlined text-[20px] text-white text-center w-[30px] h-[30px] rounded-full border-[0.1px] border-gray-700 bg-black hover:bg-gray-700`}>&#xe5cc;</button>*/}
                {/*</div>*/}
            </div>
        </div>,
        portal
    );
};

export default Gallery;
