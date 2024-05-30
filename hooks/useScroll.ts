import {useEffect, useLayoutEffect} from 'react';
import {useSelector} from "react-redux";
import {selectScrollTop, selectTimelineModalType} from "@/store/slices/appearanceSlice";
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
    const timelineModalType = useSelector(selectTimelineModalType)

    useEffect(() => {
        if (timelineModalType === 'none') return

        const preventDefaultScroll = (event: Event) => {
            event.preventDefault();
        }

        window.addEventListener('touchmove', preventDefaultScroll, {passive: false})
        return () => {
            window.removeEventListener('touchmove', preventDefaultScroll)
        }
    }, [timelineModalType]);
}