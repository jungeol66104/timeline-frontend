import probe from "probe-image-size";
import {storeWrapper} from "@/store/store";
import {updateCurrentPage, updateIsBottomEnd, updateIsKeynote, updateInformationContentType, updateTimelineType, updateTotalPage, updateEventContentType} from "@/store/slices/appearanceSlice";
import {updateCurrentEvents, updateCurrentTimeline, updateCurrentTimelineDraft, updatePopularTimelines, updateRecentTimelines} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import AdsTimelineTop from "@/components/ads/adsTimelineTop";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timelines/timelineSectionSecondary";
import api from "@/pages/api/api";

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const recentResponse = await api.get(`/timeline/features/1?pageNum=1&pageSize=5`, {headers: {lang: 'en'}})
        const popularResponse = await api.get(`/timeline/features/2?pageNum=1&pageSize=5`, {headers: {lang: 'en'}})
        if (recentResponse.data.code === 69999 || popularResponse.data.code === 69999) return { notFound: true }
        const data: any = {events: [], recentTimelines: recentResponse.data.data.timelineList, popularTimelines: popularResponse.data.data.timelineList, timelineInfo: {id: 0, name: "", description: '', content: "", image: 'https://cdn.timeline.vg/base-image.png'},}
        data.timelineInfo.imageSize = await probe(data.timelineInfo.image)
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateRecentTimelines(data.recentTimelines))
        store.dispatch(updatePopularTimelines(data.popularTimelines))
        store.dispatch(updateIsKeynote(false))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(1))
        store.dispatch(updateIsBottomEnd(true))
        store.dispatch(updateTimelineType('new'))
        store.dispatch(updateInformationContentType('new'))
        store.dispatch(updateEventContentType('new'))
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
{/*                 <div className={'pageWrapper w-full flex'}>
                    <TimelineSectionPrimary />
                    <TimelineSectionSecondary />
                </div> */}
            </div>
        </>
    )
}

export default NewTimelinePage;
