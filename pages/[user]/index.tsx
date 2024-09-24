import api from "@/pages/api/api";
import React from 'react';
import {storeWrapper} from "@/store/store";
import {updateCurrentPage, updateIsBottomEnd, updateTotalPage} from "@/store/slices/appearanceSlice";
import {updateCurrentPageContributions} from "@/store/slices/contentsSlice";
import {updateProfile, updateProfileDraft, updateSession} from "@/store/slices/privateSlice";
import DynamicHead from "@/components/dynamicHead";
import ProfileSectionPrimary from "@/components/private/profileSectionPrimary";
import ProfileSectionSecondary from "@/components/private/profileSectionSecondary";
import useOperateProfile from "@/hooks/useOperateProfile";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({params, req}) => {
    try {
        const user = params?.user as string
        if (!user.startsWith('@')) return { notFound: true }

        const jwt = req.cookies.timeline_jwt
        if (jwt) {
            const response = await api.get(`/user/info`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            if (response.data.code === 69999) return { notFound: true }
            const data = response.data.data
            store.dispatch(updateSession(data))
        }

        let response;
        if (jwt) response = await api.get(`/user/${user.slice(1)}/contribution?pageNum=1&pageSize=20`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
        else response = await api.get(`/user/${user.slice(1)}/contribution?pageNum=1&pageSize=20`, {headers: {lang: 'en'}});
        if (response.data.code === 69999) return { notFound: true }
        const data = response.data.data

        store.dispatch(updateProfile({username: data.username, imagePath: data.imagePath, cdnUrl: data.cdnUrl}))
        store.dispatch(updateProfileDraft({username: data.username, imagePath: data.imagePath, cdnUrl: data.cdnUrl}))
        store.dispatch(updateCurrentPageContributions(data.aboutPageInfoList))
        store.dispatch(updateTotalPage(data.totalPage))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateIsBottomEnd(data.totalPage <= 1))
    } catch (error) {console.error('Error fetching initial data during SSR: ', error);}
    return {props: {}}
})

const ProfilePage = () => {
    useOperateProfile()

    return (
        <>
            <DynamicHead type={'profile'}/>
            <div className={'page h-full'}>
                <div className={'pageWrapper relative w-full h-full flex max-[852px]:flex-col-reverse'}>
                    <ProfileSectionPrimary />
                    <ProfileSectionSecondary />
                </div>
            </div>
        </>
    )
}

export default ProfilePage
