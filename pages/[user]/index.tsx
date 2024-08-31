import React from 'react';
import {storeWrapper} from "@/store/store";
import DynamicHead from "@/components/dynamicHead";
import ProfileSectionPrimary from "@/components/private/profileSectionPrimary";
import ProfileSectionSecondary from "@/components/private/profileSectionSecondary";
import api from "@/pages/api/api";
import {updateCurrentTimelines} from "@/store/slices/contentsSlice";
import {updateCurrentPage, updateIsBottomEnd, updateTagNum, updateTimelineType, updateTotalPage} from "@/store/slices/appearanceSlice";
import {updateSession} from "@/store/slices/privateSlice";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({params, req}) => {
    try {
        const user = params?.user
        if (user && typeof user === 'string' && !user.startsWith('@')) return { notFound: true }

        const jwt = req.cookies.timeline_jwt
        if (jwt) {
            const response = await api.get('/user/info', {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            store.dispatch(updateSession(response.data.data))
        }

        const response = await api.get(`/timeline/tags/1?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
        const data = response.data.data
        store.dispatch(updateCurrentTimelines(data.timelineList))
        store.dispatch(updateTagNum(1))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(data.totalPage))
        store.dispatch(updateIsBottomEnd(data.totalPage === 1))
        store.dispatch(updateTimelineType('private'))
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
