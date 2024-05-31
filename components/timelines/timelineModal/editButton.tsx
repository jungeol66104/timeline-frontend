import React from 'react';
import {updateIsEdit} from "@/store/slices/appearanceSlice";
import Image from "next/image";
import {useDispatch} from "react-redux";

const EditButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updateIsEdit(true))} className={`flex items-center gap-2.5 pl-2.5 pr-3 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
            <div className={'w-5 shrink-0'}><Image src={'/svg/edit.svg'} alt={'editEvent'} width={20} height={20}/></div>
            <div className={'text-sm font-semibold'}>Edit</div>
        </button>
    )
}
export default EditButton;
