import React, {useState} from 'react';
import {selectIsPopup, updateIsPopup} from "@/store/slices/appearanceSlice";
import {useDispatch, useSelector} from "react-redux";
import Popup from "@/components/layout/popups/popup";
import {selectIsSession, selectSession} from "@/store/slices/privateSlice";
import AddImageButton from "@/components/common/addImageButton";
import DeleteAccountButton from "@/components/private/deleteAccountButton";

const ProfileEditButton = () => {
    const dispatch = useDispatch()
    const isPopup = useSelector(selectIsPopup)
    const session = useSelector(selectSession)
    const isSession = useSelector(selectIsSession)

    const [usernameDraft, setUsernameDraft] = useState(session?.nickName)

    return (
        <>
            <button onClick={() => dispatch(updateIsPopup(true))} className={`w-[28px] h-[28px] flex items-center justify-center hover:text-blue-700`}>
                <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xf02e;</div>
            </button>
            {isPopup &&
                <Popup title={'Account Settings'}>
                    <div className={'flex flex-col items-center gap-5 font-medium'}>
                        <div className={'w-[104px] h-[104px] flex items-center justify-center rounded-full bg-gray-100 border-[1px] border-gray-300 shrink-0'}></div>
                        <div className={'w-full'}>
                            <h3 className={'font-semibold'}>Username</h3>
                            <input className={'w-full'} type={'text'} value={usernameDraft} onChange={(e) => setUsernameDraft(e.target.value)} />
                        </div>
                        <DeleteAccountButton />
                    </div>
                </Popup>
            }
        </>
    )
}
export default ProfileEditButton;
