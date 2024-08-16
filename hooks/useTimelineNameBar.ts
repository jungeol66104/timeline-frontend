import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {selectTimelineContentType, updateShowTimelineNameBar} from "@/store/slices/appearanceSlice";
import {getIsTimelinePath} from "@/utils/global";

const useTimelineNameBar = () => {
    const router = useRouter();

    const dispatch = useDispatch();
    const timelineContentType = useSelector(selectTimelineContentType)

    useEffect(() => {
        if (!getIsTimelinePath(router.pathname)) return

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const targetExists = document.body.contains(entry.target);
                if (entry.isIntersecting || !targetExists) dispatch(updateShowTimelineNameBar(false))
                else dispatch(updateShowTimelineNameBar(true))
            });
        }, {rootMargin: '-60px 0px 0px 0px'});

        const timelineTitle : HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.timelineTitle') : null

        if (timelineTitle) observer.observe(timelineTitle);
        else dispatch(updateShowTimelineNameBar(false))
    }, [router.pathname, timelineContentType]);
};

export default useTimelineNameBar;
