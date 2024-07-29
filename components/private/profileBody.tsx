import React from 'react';
import ProfileContributions from "@/components/private/profileContributions";
import {useDispatch, useSelector} from "react-redux";
import {selectProfileType, updateProfileType} from "@/store/slices/privateSlice";

const ProfileBody = () => {
    const dispatch = useDispatch();
    const profileType = useSelector(selectProfileType)

    return (
        <div>
            <div className={'flex gap-2 pt-2 pb-1.5'}>
                <button onClick={() => dispatch(updateProfileType('timelines'))} className={`h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${profileType === 'timelines' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} bg-white text-sm font-semibold shrink-0`}>My Timelines</button>
                <button onClick={() => dispatch(updateProfileType('contributions'))} className={`h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${profileType === 'contributions' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} bg-white text-sm font-semibold shrink-0`}>Contributions</button>
            </div>
            <hr/>
            {profileType === 'timelines' && <></>}
            {profileType === 'contributions' && <ProfileContributions/>}
        </div>
    );
};

export default ProfileBody;
