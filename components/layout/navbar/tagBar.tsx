import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from "next/router";
import {getIsTouchable, getTags} from "@/utils/global";
import TagButton from "@/components/layout/navbar/tagButton";

const TagBar = () => {
    const router = useRouter()
    const isIndex = router.pathname === '/'
    const swiperContainerRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState('start');
    const [showButtons, setShowButtons] = useState(false)

    // set scrollLeft for homepage
    useEffect(() => {
        const hasQueryParams = Object.keys(router.query).length > 0;
        const tagWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.tagWrapper') : null
        if (!tagWrapper || hasQueryParams) return

        const isTouchable = getIsTouchable()
        const left = isTouchable ? 144.42 : 90

        tagWrapper.scroll({
            left: left,
            behavior: 'smooth'
        })
    }, [router.query]);

    useEffect(() => {
        const hasQueryParams = Object.keys(router.query).length > 0;
        const tagWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.tagWrapper') : null
        if (!tagWrapper || hasQueryParams) return

        const isTouchable = getIsTouchable()
        const left = isTouchable ? 144.42 : 90
        // const left = isTouchable ? 314.42 : 260

        tagWrapper.scroll({
            left: left,
            behavior: 'smooth'
        })
    }, []);

    // set scroll position
    useEffect(() => {
        const swiperContainer = swiperContainerRef.current
        if (!swiperContainer) return

        const handleScroll = () => {
            if (swiperContainer.scrollLeft === 0) setScrollPosition('start')
            else if (Math.ceil(swiperContainer.scrollLeft) >= (swiperContainer.scrollWidth - swiperContainer.clientWidth)) setScrollPosition('end');
            else setScrollPosition('middle')
        }

        swiperContainer.addEventListener('scroll', handleScroll)
        return () => {
            swiperContainer.removeEventListener('scroll', handleScroll)
        }
    });

    // set showButtons
    useEffect(() => {
        const swiperContainer = swiperContainerRef.current
        if (!swiperContainer || getIsTouchable()) return

        const handleResize = () => {
            const hasScroll = swiperContainer.scrollWidth > swiperContainer.clientWidth
            if (hasScroll) setShowButtons(true)
            else setShowButtons(false)
        }

        const observer = new ResizeObserver(handleResize)
        observer.observe(swiperContainer)
        return () => {
            observer.disconnect()
        }
    });

    const handleClick = (direction: string) => {
        if ((scrollPosition === 'start' && direction === 'prev') || (scrollPosition === 'end' && direction === 'next')) return;

        const swiperContainer = swiperContainerRef.current
        if (!swiperContainer) return

        const containerWidth = swiperContainer.clientWidth
        const containerScrollWidth = swiperContainer.scrollWidth
        const containerScrollLeft = swiperContainer.scrollLeft

        const containerChildren = Array.from(swiperContainer.children as unknown as HTMLDivElement[])
        const childLefts = containerChildren.map(child => child.offsetLeft)
        const childRights = containerChildren.map(child => containerScrollWidth - child.offsetLeft - child.offsetWidth)

        if (direction === 'prev') {
            const order = childRights.findIndex(right => right <= containerScrollWidth - containerScrollLeft)
            containerChildren[order].scrollIntoView({inline: "end", behavior: 'smooth', block: 'nearest'})
        } else {
            const order = childLefts.findLastIndex(left => left <= containerWidth + containerScrollLeft)
            containerChildren[order].scrollIntoView({inline: "start", behavior: 'smooth', block: 'nearest'})
        }
    }

    return (
        <div className={`tagBar sticky top-[60px] h-fit w-full border-b-[1px] bg-white z-[4999] ${!isIndex && 'hidden'}`}>
            <div className={`fixed top-[60px] left-0 pt-[1px] pl-4 pr-6 h-[45.67px] ${scrollPosition === 'start' ? 'pointer-events-none opacity-0' : 'opacity-100'} transition-opacity flex items-center ${!showButtons && 'hidden'}`} style={{backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 1) 75%, rgba(255, 255, 255, 0))"}}><button onClick={() => handleClick('prev')} className={`material-symbols-outlined text-[20px] flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1px] border-gray-200 bg-white hover:bg-gray-100`}>&#xe5cb;</button></div>
            <div className={`fixed top-[60px] right-0 pt-[1px] pl-6 pr-4 h-[45.67px] ${scrollPosition === 'end' ? 'pointer-events-none opacity-0' : 'opacity-100'} transition-opacity flex items-center ${!showButtons && 'hidden'}`} style={{backgroundImage: "linear-gradient(to left, rgba(255, 255, 255, 1) 75%, rgba(255, 255, 255, 0))"}}><button onClick={() => handleClick('next')} className={`material-symbols-outlined text-[20px] flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1px] border-gray-200 bg-white hover:bg-gray-100`}>&#xe5cc;</button></div>
            <div ref={swiperContainerRef} className={'tagWrapper overflow-x-scroll pt-2 pb-1.5 px-3 flex gap-2 shrink-0'}>
                {getTags().map((tag, i) => {
                    return (
                        <TagButton key={i} tagNum={i + 1}/>
                    )
                })}
            </div>
        </div>
    );
};


export default TagBar;
