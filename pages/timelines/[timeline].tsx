import Timeline from "@/components/timeline/timeline";
import {RefObject, useEffect, useRef} from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {updateShowTitle, updateTitle} from "@/store/slices/layoutSlice";
import {GetServerSideProps} from "next";
import events, {initialEvents, TimelineEvent} from "@/public/events";

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const initialData = initialEvents
        const data = events
        return {props: {data, initialData}}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {data:[], initialData: []}}
    }
}

const TimelinePage = ({data, initialData}:{data:TimelineEvent[], initialData: TimelineEvent[]}) => {
    const scrollRef: RefObject<HTMLDivElement> = useRef(null)

    return (
        <div ref={scrollRef} className={'page'}>
            {/*<TimelineContents scrollRef={scrollRef} />*/}
            <Timeline data={data} initialData={initialData} scrollRef={scrollRef}/>
        </div>
    )
}

export default TimelinePage

const TimelineContents = ({scrollRef}: {scrollRef: RefObject<HTMLDivElement>}) => {
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateTitle(router.query.timeline))
    }, [router.query]);

    useEffect(() => {
        const scrollWrapper = scrollRef.current
        if (!scrollWrapper) return

        const handleScroll = () => {
            if (scrollWrapper.scrollTop > 52) {dispatch(updateShowTitle(true))}
            else dispatch(updateShowTitle(false))
        }

        scrollWrapper.addEventListener('scroll', handleScroll)
        return () => {
            scrollWrapper.removeEventListener('scroll', handleScroll)
        };
    }, []);

    return (
        <div className={'mt-5 mb-5 z-40'}>
            <div className={'text-2xl font-black'}>{router.query.timeline}</div>
        </div>
    )
}