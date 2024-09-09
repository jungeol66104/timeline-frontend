import api from "@/pages/api/api";
import React from 'react';
import {storeWrapper} from "@/store/store";
import {updateIsBottomEnd, updateTotalPage} from "@/store/slices/appearanceSlice";
import {updateCurrentContributions, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import {updateSession} from "@/store/slices/privateSlice";
import DynamicHead from "@/components/dynamicHead";
import ProfileSectionPrimary from "@/components/private/profileSectionPrimary";
import ProfileSectionSecondary from "@/components/private/profileSectionSecondary";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({params, req}) => {
    try {
        const user = params?.user
        if (!user || (user && typeof user === 'string' && !user.startsWith('@'))) return { notFound: true }

        const jwt = req.cookies.timeline_jwt
        if (jwt) {
            const response = await api.get(`/user/info`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            if (response.data.code === 69999) return { notFound: true }
            const data = response.data.data

            store.dispatch(updateSession(data))
        }
        const response = await api.get(`/user/${user.slice(1)}/contribution?pageNum=1&pageSize=20`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
        if (response.data.code === 69999) return { notFound: true }
        const data = response.data.data

        store.dispatch(updateCurrentContributions(data.aboutPageInfoList))
        store.dispatch(updateTotalPage(data.totalPage))
        store.dispatch(updateIsBottomEnd(data.totalPage === 1))

        return {props: {}}
    } catch (error) {
        console.error('Error fetching initial data during SSR: ', error);
        return {props: {}}
    }
})

const ProfilePage = () => {
    return (
        <>
            <DynamicHead type={'index'}/>
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
