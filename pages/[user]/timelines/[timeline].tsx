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
            const response = await api.get(`/user/timeline/${Number(timeline)}`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}})
            if (response.data.code === 69999) return { notFound: true }
            const data = response.data.data
            let newTimeline = {id:timeline, title: data.title, description:data.description, content: data.content, updateDT: data.updatedDT, imagePath: data.imagePath, cdnUrl: data.cdnUrl, imageSize: {}}
            newTimeline.imageSize = await probe(newTimeline.cdnUrl + newTimeline.imagePath)

            store.dispatch(updateCurrentEvents(data.privateEventList))
            store.dispatch(updateCurrentTimeline(newTimeline))
            store.dispatch(updateCurrentTimelineDraft(newTimeline))
            store.dispatch(updateTimelineType('private'))
        }
        return {props: {}}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
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