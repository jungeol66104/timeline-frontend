import React from 'react';
import {storeWrapper} from "@/store/store";
import DynamicHead from "@/components/dynamicHead";
import PersonalSectionPrimary from "@/components/private/personalSectionPrimary";
import PersonalSectionSecondary from "@/components/private/personalSectionSecondary";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({params}) => {
    try {
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
                    <PersonalSectionSecondary />
                </div>
            </div>
        </>
    )
}
export default ProfilePage
