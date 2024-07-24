import React from "react";
import api from "@/pages/api/api";
import {storeWrapper} from "@/store/store";
import {updateCurrentTimelines} from "@/store/slices/contentsSlice";
import {updateCurrentPage, updateIsBottomEnd, updateTagNum, updateTotalPage} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import IndexSectionPrimary from "@/components/index/indexSectionPrimary";
import useOperateIndex from "@/hooks/useOperateIndex";
import IndexSectionSecondary from "@/components/index/indexSectionSecondary";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({query}) => {
    try {
        const tagNum = Number(query.tagNum || 4)
        const type = tagNum < 4 ? 'features' : 'tags'
        const id = tagNum < 4 ? tagNum : tagNum - 3
        const response = await api.get(`/timeline/${type}/${id}?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
        const data = response.data.data
        store.dispatch(updateCurrentTimelines(data.timelineList))
        store.dispatch(updateTagNum(tagNum))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(data.totalPage))
        store.dispatch(updateIsBottomEnd(data.totalPage === 1))
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
