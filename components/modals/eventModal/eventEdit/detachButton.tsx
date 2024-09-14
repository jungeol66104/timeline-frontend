import React from "react";
import {useDispatch} from "react-redux";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const DetachButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updatePopupType('detachEvent'))} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xe15b;</button>
    );
};

export default DetachButton;
