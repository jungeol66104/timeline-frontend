import probe from "probe-image-size"
import api from "@/pages/api/api"
import {storeWrapper} from "@/store/store";
import {updateCurrentEvents, updateCurrentTimeline, updateCurrentTimelineDraft, updatePopularTimelines, updateRecentTimelines, updateRelatedTimelines} from "@/store/slices/contentsSlice"
import DynamicHead from "@/components/dynamicHead";
import AdsTimelineTop from "@/components/ads/adsTimelineTop";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timelines/timelineSectionSecondary";

export const getStaticPaths = async () => {return {paths: [], fallback: 'blocking'}}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({ params }) => {
    try {
        const response = await api.get(`/timeline/${Number(params?.timeline)}`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) return { notFound: true }
        const data = response.data.data
        data.timelineInfo.imageSize = await probe("https://" + data.timelineInfo.cdnUrl + data.timelineInfo.imagePath)

        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateRelatedTimelines(data.relatedTimelines))
        store.dispatch(updateRecentTimelines(data.recentTimelines))
        store.dispatch(updatePopularTimelines(data.popularTimelines))
        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSG:', error);
        return {props: {}, revalidate: 10}
    }
})

const TimelinePage = () => {
    return (
        <>
            <DynamicHead type={'timeline'}/>
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

export default TimelinePage;
