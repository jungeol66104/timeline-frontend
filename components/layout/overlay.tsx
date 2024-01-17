import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsShare, updateIsShare} from "@/store/slices/appearanceSlice";

const Overlay = () => {
    const dispatch = useDispatch()
    const isShare = useSelector(selectIsShare)


    const handleClick = () => {
        dispatch(updateIsShare())
    }

    return (
        <div onClick={handleClick} className={`${isShare ? 'opacity-30' : 'pointer-events-none opacity-0'} absolute w-full max-w-lg h-full top-0 left-1/2 transform -translate-x-1/2 bg-black`} style={{zIndex: 5001, transition: 'opacity 0.3s'}}></div>
    );
};

export default Overlay;