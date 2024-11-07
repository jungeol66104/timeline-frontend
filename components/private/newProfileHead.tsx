import React from 'react';
import Image from "next/image";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {selectIsSession, selectProfile, selectSession} from "@/store/slices/privateSlice";
import ProfileSettingsButton from "@/components/private/profileSettingsButton";
import AddProfileImageButton from "@/components/layout/popups/settings/addProfileImageButton";
import {getIsBaseImage} from "@/utils/global";
import NewProfileSettingsButton from "@/components/private/newProfileSettingsButton";

const ProfileHead = () => {
    const router = useRouter()
    const query = router.query.user?.slice(1) as string

    const session = useSelector(selectSession)
    const isSession = useSelector(selectIsSession)
    const profile = useSelector(selectProfile)

    const isBaseImage = getIsBaseImage(profile.imagePath)

    return (
        <div className={`pt-6 pb-4 w-full h-full flex flex-col items-center gap-5`}>
            {isBaseImage
                ?   isSession && session.username === query
                    ?   <div className={'w-[104px] h-[104px] flex items-center justify-center rounded-full bg-gray-100 border-[1px] border-gray-300 shrink-0'}><AddProfileImageButton/></div>
                    :   <div className={'w-[104px] h-[104px] flex items-center justify-center rounded-full bg-gray-600 text-white text-5xl font-medium border-[1px] border-gray-300 shrink-0'}>{query.slice(0, 2).toUpperCase()}</div>
                :   <div className={'overflow-hidden relative w-[104px] h-[104px] rounded-full border-[1px] border-gray-300 shrink-0'}><Image src={profile.cdnUrl + profile.imagePath} alt={profile.username} fill priority style={{objectFit: "cover", objectPosition: "top"}}/></div>
            }
            <div className={'flex flex-col justify-center'}>
                {isSession && session.username === query
                    ?   <div className={'flex flex-col items-center gap-2'}>
                            <div className={'text-xl font-bold'}>{session.username}</div>
                            <NewProfileSettingsButton/>
                        </div>
                    :   <div><div className={'text-[20px] font-bold'}>{query}</div></div>
                }
            </div>
        </div>
    );
};

export default ProfileHead;
