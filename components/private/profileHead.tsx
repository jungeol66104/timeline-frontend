import React from 'react';
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {selectIsSession, selectSession} from "@/store/slices/privateSlice";
import {selectIsEdit} from "@/store/slices/appearanceSlice";
import ProfileEditButton from "@/components/private/profileEditButton";
import ProfileSaveButton from "@/components/private/profileSaveButton";
import DeleteAccountButton from "@/components/private/deleteAccountButton";
import AddImageButton from "@/components/common/edit/addImageButton";

const ProfileHead = () => {
    const router = useRouter()
    const query = router.query.user?.slice(1) as string
    const session = useSelector(selectSession)
    const isSession = useSelector(selectIsSession)
    const isEdit = useSelector(selectIsEdit)

    return (
        <div className={`pt-6 pb-4 w-fit h-full flex gap-5`}>
            {isSession && session.nickName === query
                ? <div className={'w-[104px] h-[104px] flex items-center justify-center rounded-full bg-gray-100 border-[1px] border-gray-300 shrink-0'}><AddImageButton/></div>
                : <div className={'w-[104px] h-[104px] flex items-center justify-center rounded-full bg-gray-600 text-white text-5xl font-medium border-[1px] border-gray-300 shrink-0'}>{query.slice(0, 2).toUpperCase()}</div>
            }
            <div className={'min-h-[104px] flex flex-col justify-center'}>
                {isSession && session.nickName === query
                    ? <div className={'flex items-center justify-center'}>
                        <div className={'text-[20px] font-bold'}>{session.nickName}</div>
                        {isEdit
                            ? <div className={'flex gap-3 max-[852px]:flex-col'}>
                                <ProfileSaveButton/>
                                <DeleteAccountButton/>
                            </div>
                            : <ProfileEditButton/>
                        }
                    </div>
                    : <div>
                        <div className={'text-[20px] font-bold'}>{query}</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ProfileHead;
