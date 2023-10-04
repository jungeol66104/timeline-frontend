import Timeline from "@/components/timeline";
import {RefObject, useEffect, useRef} from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {updateShowTitle, updateTitle} from "@/store/slices/layoutSlice";

const TimelinePage = () => {
    const scrollRef: RefObject<HTMLDivElement> = useRef(null)

    return (
        <div ref={scrollRef} className={'page'}>
            <TimelineContents scrollRef={scrollRef} />
            <Timeline scrollRef={scrollRef}/>
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