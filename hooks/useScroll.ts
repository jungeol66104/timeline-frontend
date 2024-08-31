import {useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, selectPopupType, selectScrollTop, selectTimelineType, updateScrollTop} from "@/store/slices/appearanceSlice";
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
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)

    useLayoutEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const layout: HTMLElement | null = typeof window !== 'undefined' ? document.querySelector('.layout') : null
        if (!scrollWrapper || !layout || timelineType === 'demo') return

        if (modalType === 'none') {
            layout.style.position = ''
            layout.style.top = ''
            scrollWrapper.scrollTop = scrollTop
        } else {
            const initialScrollTop = scrollWrapper.scrollTop
            layout.style.position = 'fixed'
            layout.style.top = `${-initialScrollTop}px`
            dispatch(updateScrollTop(initialScrollTop))
        }
    }, [modalType]);
}

export const useDisableDemoScroll = () => {
    const dispatch = useDispatch()
    const [demoScrollTop, setDemoScrollTop] = useState(0)
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)

    const getDemoScrollWrapper = () => {
        return typeof window !== 'undefined' ? document.querySelector('.demoScrollWrapper') : null
    }

    useLayoutEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const demoScrollWrapper = getDemoScrollWrapper()
        const demoLayout: HTMLElement | null = typeof window !== 'undefined' ? document.querySelector('.demoLayout') : null
        if (!scrollWrapper || !demoScrollWrapper || !demoLayout || timelineType !== 'demo') return

        if (modalType === 'none') {
            demoLayout.style.position = ''
            demoLayout.style.top = ''
            demoScrollWrapper.scrollTop = demoScrollTop
        } else {
            const initialDemoScrollTop = demoScrollWrapper.scrollTop
            demoLayout.style.position = 'sticky'
            demoLayout.style.top = `${-initialDemoScrollTop}px`
            setDemoScrollTop(initialDemoScrollTop)
        }
        dispatch(updateScrollTop(scrollWrapper.scrollTop))
    }, [modalType]);
}


export const usePopupDisableScroll = () => {
    const dispatch = useDispatch()
    const scrollTop = useSelector(selectScrollTop)
    const modalType = useSelector(selectModalType)
    const popupType = useSelector(selectPopupType)

    useLayoutEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const layout: HTMLElement | null = typeof window !== 'undefined' ? document.querySelector('.layout') : null
        if (!scrollWrapper || !layout) return

        if (modalType !== 'none') return
        if (popupType === 'none') {
            layout.style.position = ''
            layout.style.top = ''
            scrollWrapper.scrollTop = scrollTop
        } else {
            const initialScrollTop = scrollWrapper.scrollTop
            layout.style.position = 'fixed'
            layout.style.top = `${-initialScrollTop}px`
            dispatch(updateScrollTop(initialScrollTop))
        }
    }, [popupType]);
}