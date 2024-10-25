import api from "@/pages/api/api";
import React from "react";
import {storeWrapper} from "@/store/store";
import {updateIsBottomEnd, updateTagNum, updateTotalPage} from "@/store/slices/appearanceSlice";
import {updateCurrentTimelines} from "@/store/slices/contentsSlice";
import {updateSession} from "@/store/slices/privateSlice";
import DynamicHead from "@/components/dynamicHead";
import IndexSectionPrimary from "@/components/index/indexSectionPrimary";
import IndexSectionSecondary from "@/components/index/indexSectionSecondary";
import useOperateIndex from "@/hooks/useOperateIndex";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({query, req}) => {
    try {
        const jwt = req.cookies.timeline_jwt
        if (jwt) {
            const response = await api.get(`/user/info`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            if (response.data.code === 69999) return { notFound: true }
            const data = response.data.data

            store.dispatch(updateSession(data))
        }

        const tagNum = Number(query.tagNum || 2)
        const type = tagNum < 4 ? 'features' : 'tags'
        const id = tagNum < 4 ? tagNum : tagNum - 3
        const response = await api.get(`/timeline/${type}/${id}?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) return { notFound: true }
        const data = response.data.data

        store.dispatch(updateCurrentTimelines(data.timelineList))
        store.dispatch(updateTotalPage(data.totalPage))
        store.dispatch(updateIsBottomEnd(data.totalPage <= 1))
        store.dispatch(updateTagNum(tagNum))
    } catch (error) {console.error('Error fetching initial data during SSR: ', error);}
    return {props: {}}
})

export default function Home() {
    useOperateIndex()

    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page h-full'}>
                <div className={'pageWrapper relative w-full flex'}>
                    <IndexSectionPrimary />
                    <IndexSectionSecondary />
                </div>
            </div>
        </>
    )
}