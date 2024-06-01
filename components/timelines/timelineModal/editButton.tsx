import React from 'react';
import {updateIsEdit} from "@/store/slices/appearanceSlice";
import Image from "next/image";
import {useDispatch} from "react-redux";

const EditButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updateIsEdit(true))} className={`pl-1.5 pr-2.5 flex items-center justify-center gap-2.5 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
            <div className={'material-symbols-outlined text-[20px]'}>&#xf88d;</div>
            <div className={'text-sm font-semibold'}>Edit</div>
        </button>
    )
}
export default EditButton;
