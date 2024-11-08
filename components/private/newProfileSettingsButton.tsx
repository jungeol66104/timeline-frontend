import React from 'react';
import {updatePopupType} from "@/store/slices/appearanceSlice";
import {useDispatch} from "react-redux";

const NewProfileSettingsButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updatePopupType('settings'))} className={'text-sm text-blue-700 font-medium  hover:underline'}>Profile Settings</button>
    );
};

export default NewProfileSettingsButton;
