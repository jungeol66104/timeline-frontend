import DynamicHead from "@/components/dynamicHead";
import NewTimelineSectionPrimary from "@/components/timelines/new/newTimelineSectionPrimary";
import NewTimelineSectionSecondary from "@/components/timelines/new/newTimelineSectionSecondary";
import {storeWrapper} from "@/store/store";
import api from "@/pages/api/api";
import probe from "probe-image-size";
import {updateCurrentPage, updateIs404, updateIsBottomEnd, updateIsSummary, updateTotalPage} from "@/store/slices/appearanceSlice";
import {updateCurrentEvents, updateCurrentTimeline, updatePopularTimelines, updateRecentTimelines, updateRelatedNews, updateRelatedTimelines} from "@/store/slices/contentsSlice";

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const response = await api.get(`/timeline/${Number(params?.timeline)}/paged?pageNum=1&pageSize=41&isSummary=true`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) store.dispatch(updateIs404(true))
        const data = response.data.data
        data.timelineInfo.imageSize = await probe(data.timelineInfo.image)
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateIsSummary(true))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(1))
        store.dispatch(updateIsBottomEnd(true))
        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}, revalidate: 10}
    }
})

const NewTimelinePage = () => {

    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={`page`}>
                <div className={'pageWrapper w-full flex'}>
                    <NewTimelineSectionPrimary />
                    <NewTimelineSectionSecondary />
                </div>
            </div>
        </>
    )
}
export default NewTimelinePage;
