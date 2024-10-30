import React from "react";
import {useDispatch} from "react-redux";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const DetachButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updatePopupType('detachEvent'))} className={`px-2.5 h-8 text-sm text-red-700 rounded-md hover:bg-gray-100 font-semibold`}>Detach</button>
    );
};

export default DetachButton;
