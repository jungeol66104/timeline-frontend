import api from "@/pages/api/api";
import React from 'react';
import {storeWrapper} from "@/store/store";
import {updateCurrentPage, updateIsBottomEnd, updateTotalPage} from "@/store/slices/appearanceSlice";
import {updateCurrentPageContributions, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import {updateProfile, updateProfileDraft, updateProfileType, updateSession} from "@/store/slices/privateSlice";
import DynamicHead from "@/components/dynamicHead";
import ProfileSectionPrimary from "@/components/private/profileSectionPrimary";
import ProfileSectionSecondary from "@/components/private/profileSectionSecondary";
import useOperateProfile from "@/hooks/useOperateProfile";
import axios from "axios";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({params, req}) => {
    const protocol = req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
    const host = req.headers.host.split('/')[0];
    const baseUrl = `${protocol}://${host}`;

    const user = params?.user as string
    if (!user.startsWith('@')) return { notFound: true }
    const username = user.slice(1)

    try {
        let type
        const jwt = req.cookies.timeline_jwt
        if (jwt) {
            const response = await api.get(`/user/info`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            if (response.data.code === 69999) return { notFound: true }
            const session = response.data.data
            store.dispatch(updateSession(session))

            if (session.username === username) type = 1
            else type = 0
        } else type = 0

        const response = await axios.get(`${baseUrl}/api/user/profile?type=${type}&user=${username}`, {headers: {Authorization: `Bearer ${jwt}`,},})
        if (response.data.code === 69999) return { notFound: true }
        const data = response.data

        if (type === 0) store.dispatch(updateCurrentPageContributions(data.aboutPageInfoList))
        else store.dispatch(updateCurrentTimelines(data.aboutPageInfoList))

        store.dispatch(updateProfile({username: data.username, imagePath: data.imagePath, cdnUrl: data.cdnUrl}))
        store.dispatch(updateProfileDraft({username: data.username, imagePath: data.imagePath, cdnUrl: data.cdnUrl}))
        store.dispatch(updateTotalPage(data.totalPage))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateIsBottomEnd(data.totalPage <= 1))
        store.dispatch(updateProfileType(type === 0 ? 'contributions' : 'timelines'))

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
