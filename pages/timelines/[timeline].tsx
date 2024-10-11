import probe from "probe-image-size"
import api from "@/pages/api/api"
import {storeWrapper} from "@/store/store";
import {updateCurrentEvents, updateCurrentTimeline, updateCurrentTimelineDraft, updatePopularTimelines, updateRecentTimelines, updateRelatedTimelines} from "@/store/slices/contentsSlice"
import DynamicHead from "@/components/dynamicHead";
import AdsTimelineTop from "@/components/ads/adsTimelineTop";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import TimelineSectionSecondary from "@/components/timelines/timelineSectionSecondary";
import {updateSession} from "@/store/slices/privateSlice";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import {wrapPTag} from "@/utils/global";



export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({ req, query }) => {
    try {
        const jwt = req.cookies.timeline_jwt
        if (jwt) {
            const response = await api.get(`/user/info`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            if (response.data.code === 69999) return { notFound: true }
            const data = response.data.data

            store.dispatch(updateSession(data))
        }

        const response = await api.get(`/timeline/${Number(query?.timeline)}`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) return { notFound: true }
        const data = response.data.data
        // non-english languages error
        data.timelineInfo.imageSize = await probe(data.timelineInfo.cdnUrl + data.timelineInfo.imagePath)

        const window = new JSDOM('').window;
        const purify = DOMPurify(window);
        data.timelineInfo.content = purify.sanitize(data.timelineInfo.content, {ALLOWED_TAGS: []})
        data.events = data.events.map((event: any) => ({...event, content: purify.sanitize(event.content, {ALLOWED_TAGS: []})}))

        store.dispatch(updateCurrentEvents(data.events))
        store.dispatch(updateCurrentTimeline(data.timelineInfo))
        store.dispatch(updateCurrentTimelineDraft(data.timelineInfo))
        store.dispatch(updateRelatedTimelines(data.relatedTimelines))
        store.dispatch(updateRecentTimelines(data.recentTimelines))
        store.dispatch(updatePopularTimelines(data.popularTimelines))
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
