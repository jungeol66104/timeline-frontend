import React from 'react';
import {updateIsEdit} from "@/store/slices/appearanceSlice";
import {useDispatch} from "react-redux";

const ProfileEditButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updateIsEdit(true))} className={`px-2 w-fit h-[36px] flex items-center justify-center gap-1.5 border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
            <div className={'material-symbols-outlined text-[20px]'}>&#xf4fa;</div>
            <div className={'text-sm font-semibold'}>Edit</div>
        </button>
    )
}
export default ProfileEditButton;
