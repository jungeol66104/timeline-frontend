import React from 'react';
import Popup from "@/components/layout/popup";
import {useDispatch, useSelector} from "react-redux";
import {selectIsPopup, updateIsPopup} from "@/store/slices/appearanceSlice";

const GuideButton = ({type}: {type: string}) => {
    const dispatch = useDispatch()
    const isPopup = useSelector(selectIsPopup)

    return (
        <>
            <button onClick={() => dispatch(updateIsPopup(true))} className={'flex items-center gap-1 text-blue-700'}>
                <div className={'material-symbols-outlined text-[12px]'}>&#xe887;</div>
                <span className={'mt-[1px] text-[10px]'}>Guide</span>
            </button>
            {isPopup &&
                <Popup title={'Guide'}>
                <div>hi</div>
                </Popup>
            }
        </>
    );
};

export default GuideButton;
