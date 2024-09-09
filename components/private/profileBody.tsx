import axios from "axios";
import React from 'react';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {updateCurrentContributions, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import {selectIsSession, selectProfileType, selectSession, updateProfileType} from "@/store/slices/privateSlice";
import ProfileMyTimelines from "@/components/private/profileMyTimelines";
import ProfileContributions from "@/components/private/profileContributions";

const ProfileBody = () => {
    const router = useRouter()
    const query = router.query.user?.slice(1) as string

    const dispatch = useDispatch();
    const session = useSelector(selectSession)
    const isSession = useSelector(selectIsSession)
    const profileType = useSelector(selectProfileType)

    const handleClick = async (typeString: string) => {
        try {
            const type = typeString === 'contributions' ? 0 : 1
            const response = await axios.get(`/api/user/profile?type=${type}&user=${query}`)
            const data = response.data

            if (type === 0) dispatch(updateCurrentContributions(data.aboutPageInfoList))
            else dispatch(updateCurrentTimelines(data.aboutPageInfoList))
            dispatch(updateProfileType(typeString))
        } catch (error) {console.error('', error)}
    }

    return (
        <div>
            <div className={'flex gap-2 pt-2 pb-1.5'}>
                <button onClick={() => handleClick('contributions')} className={`h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${profileType === 'contributions' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} bg-white text-sm font-semibold shrink-0`}>Contributions</button>
                {isSession && session.username === query && <button onClick={() => handleClick('timelines')} className={`h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${profileType === 'timelines' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} bg-white text-sm font-semibold shrink-0`}>My Timelines</button>}
            </div>
            <hr/>
            {profileType === 'contributions' && <ProfileContributions/>}
            {profileType === 'timelines' && <ProfileMyTimelines />}
        </div>
    );
};

export default ProfileBody;
