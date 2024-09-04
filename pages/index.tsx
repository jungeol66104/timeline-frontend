import api from "@/pages/api/api";
import React from "react";
import {storeWrapper} from "@/store/store";
import {updateIsBottomEnd, updateTagNum, updateTotalPage} from "@/store/slices/appearanceSlice";
import {updateCurrentTimelines} from "@/store/slices/contentsSlice";
import useOperateIndex from "@/hooks/useOperateIndex";
import DynamicHead from "@/components/dynamicHead";
import IndexSectionPrimary from "@/components/index/indexSectionPrimary";
import IndexSectionSecondary from "@/components/index/indexSectionSecondary";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({query}) => {
    try {
        const tagNum = Number(query.tagNum || 4)
        const type = tagNum < 4 ? 'features' : 'tags'
        const id = tagNum < 4 ? tagNum : tagNum - 3
        const response = await api.get(`/timeline/${type}/${id}?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
        const data = response.data.data

        store.dispatch(updateCurrentTimelines(data.timelineList))
        store.dispatch(updateTotalPage(data.totalPage))
        store.dispatch(updateIsBottomEnd(data.totalPage === 1))
        store.dispatch(updateTagNum(tagNum))
        return {props: {}}
    } catch (error) {
        console.error('Error fetching initial data during SSR: ', error);
        return {props: {}}
    }
})

export default function Home() {
    useOperateIndex()

    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page indexPage h-full'}>
                <div className={'indexPageWrapper pageWrapper relative w-full flex'}>
                    <IndexSectionPrimary />
                    <IndexSectionSecondary />
                </div>
            </div>
        </>
    )
}