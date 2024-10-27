import {storeWrapper} from "@/store/store";
import {updateSession} from "@/store/slices/privateSlice";
import {updateCurrentEvents, updateCurrentTimeline, updateCurrentTimelineDraft, updatePopularTimelines, updateRecentTimelines, updateRelatedTimelines} from "@/store/slices/contentsSlice"
import DynamicHead from "@/components/dynamicHead";
import AdsTimelineTop from "@/components/ads/adsTimelineTop";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timelines/timelineSectionSecondary";

import api from "@/pages/api/api"
import {wrapPTag} from "@/utils/global";
import probe from "probe-image-size"

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({req, query}) => {
    try {
        const jwt = req.cookies.timeline_jwt
        if (jwt) {
            const response = await api.get(`/user/info`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            if (response.data.code === 69999) return {notFound: true}
            const data = response.data.data

            store.dispatch(updateSession(data))
        }

        const response = await api.get(`/timeline/${query?.timeline}`, {headers: {lang: 'en'}})
        if (response.status === 301) return {redirect: {destination: response.headers.location, permanent: true}}
        if (response.data.code === 69999) return {notFound: true}
        const data = response.data.data
        // non-english languages error
        data.timelineInfo.imageSize = await probe(data.timelineInfo.cdnUrl + encodeURIComponent(data.timelineInfo.imagePath))
        data.timelineInfo.content = wrapPTag(data.timelineInfo.content)
        data.events = data.events.map((event: any) => ({...event, content: wrapPTag(event.content)}))

        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateCurrentEvents(data.events))

        store.dispatch(updateRelatedTimelines(data.relatedTimelines))
        store.dispatch(updatePopularTimelines(data.popularTimelines))
        store.dispatch(updateRecentTimelines(data.recentTimelines))
    } catch (error) {console.error('Error fetching initial data during SSR:', error);}
    return {props: {}}
})

const TimelinePage = () => {

    return (
        <>
            <DynamicHead type={'publicTimeline'}/>
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
