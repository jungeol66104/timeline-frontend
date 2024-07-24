import probe from "probe-image-size";
import {storeWrapper} from "@/store/store";
import {updateCurrentPage, updateIs404, updateIsBottomEnd, updateIsSummary, updateTimelineContentType, updateTotalPage} from "@/store/slices/appearanceSlice";
import {updateCurrentEvents, updateCurrentEventsDraft, updateCurrentTimeline, updateCurrentTimelineDraft, updatePopularTimelines, updateRecentTimelines} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import AdsTimelineTop from "@/components/ads/adsTimelineTop";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timelines/timelineSectionSecondary";
import api from "@/pages/api/api";

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const recentResponse = await api.get(`/timeline/features/1?pageNum=1&pageSize=5`, {headers: {lang: 'en'}})
        if (recentResponse.data.code === 69999) store.dispatch(updateIs404(true))
        const recentTimelines = recentResponse.data.data.timelineList
        const popularResponse = await api.get(`/timeline/features/2?pageNum=1&pageSize=5`, {headers: {lang: 'en'}})
        if (popularResponse.data.code === 69999) store.dispatch(updateIs404(true))
        const popularTimelines = popularResponse.data.data.timelineList
        const data: any = {events: [], recentTimelines: recentTimelines, popularTimelines: popularTimelines, timelineInfo: {id: 0, name: "", description: '', content: "", image: 'https://cdn.timeline.vg/base-image.png'},}
        data.timelineInfo.imageSize = await probe(data.timelineInfo.image)
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateRecentTimelines(data.recentTimelines))
        store.dispatch(updatePopularTimelines(data.popularTimelines))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateCurrentEventsDraft(data.events))
        store.dispatch(updateIsSummary(false))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(1))
        store.dispatch(updateIsBottomEnd(true))
        store.dispatch(updateTimelineContentType('new'))
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
                <AdsTimelineTop />
                <hr/>
                <div className={'pageWrapper w-full flex'}>
                    <TimelineSectionPrimary />
                    <TimelineSectionSecondary />
                </div>
            </div>
        </>
    )
}
export default NewTimelinePage;
