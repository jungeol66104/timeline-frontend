import probe from "probe-image-size";
import api from "@/pages/api/api";
import {storeWrapper} from "@/store/store";
import {updateInformationContentType, updateTimelineType, updateEventContentType} from "@/store/slices/appearanceSlice";
import {updateCurrentEvents, updateCurrentTimeline, updateCurrentTimelineDraft, updatePopularTimelines, updateRecentTimelines} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import AdsTimelineTop from "@/components/ads/adsTimelineTop";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timelines/timelineSectionSecondary";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async () => {
    try {
        const recentResponse = await api.get(`/timeline/features/1?pageNum=1&pageSize=5`, {headers: {lang: 'en'}})
        const popularResponse = await api.get(`/timeline/features/2?pageNum=1&pageSize=5`, {headers: {lang: 'en'}})
        if (recentResponse.data.code === 69999 || popularResponse.data.code === 69999) return { notFound: true }
        const data: any = {events: [], recentTimelines: recentResponse.data.data.timelineList, popularTimelines: popularResponse.data.data.timelineList, timelineInfo: {id: 0, title: "", description: "", content: "", imagePath: 'base-image.png', cdnUrl: "https://cdn.timeline.vg/"}}
        data.timelineInfo.imageSize = await probe(data.timelineInfo.cdnUrl + data.timelineInfo.imagePath)

        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateRecentTimelines(data.recentTimelines))
        store.dispatch(updatePopularTimelines(data.popularTimelines))
        store.dispatch(updateTimelineType('new'))
        store.dispatch(updateInformationContentType('new'))
        store.dispatch(updateEventContentType('new'))
        return {props: {}}
    } catch (error) {
        console.error('Error fetching initial data during SSG:', error);
        return {props: {}}
    }
})

const NewTimelinePage = () => {
    return (
        <>
            <DynamicHead type={'timeline'}/>
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
