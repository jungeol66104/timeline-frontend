import React from "react";
import probe from "probe-image-size";
import api from "@/pages/api/api"
import {storeWrapper} from "@/store/store";
import {updateCurrentEvents, updateCurrentTimeline, updatePopularTimelines, updateRecentTimelines, updateRelatedNews, updateRelatedTimelines} from "@/store/slices/contentsSlice";
import {updateIsBottomEnd, updateIs404, updateIsSummary, updateCurrentPage, updateTotalPage} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import InformationSectionSecondary from "@/components/information/informationSectionSecondary";
import InformationSectionPrimary from "@/components/information/informationSectionPrimary";

export const getStaticPaths = async () => {
    return {paths: [], fallback: 'blocking'}
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const response = await api.get(`/timeline/${Number(params?.information)}/paged?pageNum=1&pageSize=41&isSummary=true`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) store.dispatch(updateIs404(true))
        const data = response.data.data
        data.timelineInfo.imageSize = await probe(data.timelineInfo.image)
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateRelatedTimelines(data.relatedTimelines))
        store.dispatch(updateRecentTimelines(data.recentTimelines))
        store.dispatch(updatePopularTimelines(data.popularTimelines))
        store.dispatch(updateRelatedNews(data.relatedNews))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateIsSummary(true))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(data.totalPages))
        store.dispatch(updateIsBottomEnd(data.totalPages === 1))
        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}, revalidate: 10}
    }
})

const InformationPage = () => {
    return (
        <>
            <DynamicHead type={'information'}/>
            <div className={'page informationPage'}>
                <div className={'informationPageWrapper w-full flex'}>
                    <InformationSectionPrimary />
                    <InformationSectionSecondary />
                </div>
            </div>
        </>
    )
}
export default InformationPage