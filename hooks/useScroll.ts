import {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectScrollTop, selectTimelineModalType, updateScrollTop} from "@/store/slices/appearanceSlice";
import {getScrollWrapper} from "@/utils/global";

export const useScroll = () => {
    const scrollTop = useSelector(selectScrollTop)

    useLayoutEffect(() => {
        const scrollWrapper = getScrollWrapper()
        if (!scrollWrapper) return
        scrollWrapper.scrollTop = scrollTop
    });
}

export const useDisableScroll = () => {
    const dispatch = useDispatch()
    const scrollTop = useSelector(selectScrollTop)
    const timelineModalType = useSelector(selectTimelineModalType)

    useLayoutEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const layout: HTMLElement | null = typeof window !== 'undefined' ? document.querySelector('.layout') : null
        if (!scrollWrapper || !layout) return

        if (timelineModalType === 'none') {
            layout.style.position = ''
            layout.style.top = ''
            scrollWrapper.scrollTop = scrollTop
        }
        else {
            const initialScrollTop = scrollWrapper.scrollTop
            layout.style.position = 'fixed'
            layout.style.top = `${-initialScrollTop}px`
            dispatch(updateScrollTop(initialScrollTop))
        }

    }, [timelineModalType]);
}