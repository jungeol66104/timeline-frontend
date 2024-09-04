import probe from "probe-image-size"
import api from "@/pages/api/api"
import {storeWrapper} from "@/store/store";
import {updateCurrentEvents, updateCurrentTimeline, updateCurrentTimelineDraft, updatePopularTimelines, updateRecentTimelines, updateRelatedTimelines} from "@/store/slices/contentsSlice"
import {updateTimelineType} from "@/store/slices/appearanceSlice";
import DynamicHead from "@/components/dynamicHead";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timelines/timelineSectionSecondary";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({params, req}) => {
    try {
        const { user, timeline } = params as any
        if (user && typeof user === 'string' && !user.startsWith('@')) return { notFound: true }

        const jwt = req.cookies.timeline_jwt
        if (jwt) {
            const response = await api.get(`/user/timeline/${Number(timeline)}`, {headers: {lang: 'en'}})
            if (response.data.code === 69999) return { notFound: true }
            const data = response.data.data
            data.timelineInfo.imageSize = await probe("https://" + data.timelineInfo.cdnUrl + data.timelineInfo.imagePath)

            store.dispatch(updateCurrentTimeline(data.timelineInfo))
            store.dispatch(updateCurrentEvents(data.events))
            store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
            store.dispatch(updateRelatedTimelines(data.relatedTimelines))
            store.dispatch(updateRecentTimelines(data.recentTimelines))
            store.dispatch(updatePopularTimelines(data.popularTimelines))
            store.dispatch(updateTimelineType('private'))
        }

        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSG:', error);
        return {props: {}, revalidate: 10}
    }
})

const PrivateTimelinePage = () => {
    return (
        <>
            <DynamicHead type={'timeline'}/>
            <div className={`page`}>
                <div className={'timelinePageWrapper pageWrapper w-full flex'}>
                    <TimelineSectionPrimary />
                    <TimelineSectionSecondary />
                </div>
            </div>
        </>
    )
}
export default PrivateTimelinePage