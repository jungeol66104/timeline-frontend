import React from 'react';
import api from "@/pages/api/api";
import {storeWrapper} from "@/store/store";
import DynamicHead from "@/components/dynamicHead";
import PersonalSectionPrimary from "@/components/personal/personalSectionPrimary";
import PersonalSectionSecondary from "@/components/personal/personalSectionSecondary";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({params}) => {
    try {
        const username = Array.isArray(params?.user) ? params?.user[0] : params?.user;
        // const response = await api.get(`/timeline/${type}/${id}?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
        const response = {data: {data: {}}}
        const data = response.data.data
        // store.dispatch(updateCurrentTimelines(data.timelineList))
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
                    <PersonalSectionPrimary />
                    {/*<PersonalSectionSecondary />*/}
                </div>
            </div>
        </>
    )
}
export default ProfilePage
