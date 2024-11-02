import React from "react";
import {useDispatch} from "react-redux";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const DetachButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updatePopupType('detachEvent'))} className={`shrink-0 px-2.5 w-[100px] h-9 text-sm text-red-700 hover:bg-gray-100 font-semibold rounded-md border-[0.1px] border-gray-300`}>Detach</button>
    );
};

export default DetachButton;
