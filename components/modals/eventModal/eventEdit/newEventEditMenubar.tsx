import React, {useEffect, useRef, useState} from 'react';
import SaveEventButton from "@/components/modals/eventModal/eventEdit/saveEventButton";
import KeynoteButton from "@/components/modals/eventModal/eventEdit/keynoteButton";
import {getIsTouchable} from "@/utils/global";

const NewEventEditMenubar = () => {
    const swiperWrapperRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState('start');
    const [showButtons, setShowButtons] = useState(false)

    useEffect(() => {
        const swiperWrapper = swiperWrapperRef.current
        if (!swiperWrapper) return

        const handleScroll = () => {
            if (swiperWrapper.scrollLeft === 0) setScrollPosition('start')
            else if (Math.ceil(swiperWrapper.scrollLeft) >= (swiperWrapper.scrollWidth - swiperWrapper.clientWidth)) setScrollPosition('end');
            else setScrollPosition('middle')
        }

        swiperWrapper.addEventListener('scroll', handleScroll)
        return () => {
            swiperWrapper.removeEventListener('scroll', handleScroll)
        }
    });

    useEffect(() => {
        const swiperWrapper = swiperWrapperRef.current
        // if (!swiperWrapper || getIsTouchable()) return
        if (!swiperWrapper) return

        const handleResize = () => {
            const hasScroll = swiperWrapper.scrollWidth > swiperWrapper.clientWidth
            if (hasScroll) setShowButtons(true)
            else {setShowButtons(false)}
        }

        const observer = new ResizeObserver(handleResize)
        observer.observe(swiperWrapper)
        return () => {
            observer.disconnect()
        }
    });

    const handleClick = (direction: string) => {
        if ((scrollPosition === 'start' && direction === 'prev') || (scrollPosition === 'end' && direction === 'next')) return;

        const swiperWrapper = swiperWrapperRef.current
        if (!swiperWrapper) return

        const containerWidth = swiperWrapper.clientWidth
        const containerScrollWidth = swiperWrapper.scrollWidth
        const containerScrollLeft = swiperWrapper.scrollLeft

        const containerChildren = Array.from(swiperWrapper.children as unknown as HTMLDivElement[])
        const childLefts = containerChildren.map(child => child.offsetLeft)
        const childRights = containerChildren.map(child => containerScrollWidth - child.offsetLeft - child.offsetWidth)

        if (direction === 'prev') {
            const order = childRights.findIndex(right => right <= containerScrollWidth - containerScrollLeft) + 2
            containerChildren[order].scrollIntoView({inline: "end", behavior: 'smooth', block: 'nearest'})
        } else {
            const order = childLefts.findLastIndex(left => left <= containerWidth + containerScrollLeft) - 2
            containerChildren[order].scrollIntoView({inline: "start", behavior: 'smooth', block: 'nearest'})
        }
    }

    return (
        <div className={'sticky bottom-3 w-full flex justify-between gap-3 z-10'}>
            <div className={'overflow-hidden w-full max-w-[307.33px] h-9 flex items-center border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md'}>
                <div ref={swiperWrapperRef} className={'swipeWrapper p-0.5 overflow-x-scroll w-full flex items-center gap-0.5'}>
                    <button className={`shrink-0 material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe43e;</button>
                    <button className={`shrink-0 pt-[1px] material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xf85a;</button>

                    <button className={`shrink-0 material-symbols-outlined text-[25px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xf018;</button>
                    <button className={`shrink-0 material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xf191;</button>
                    <button className={`shrink-0 material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe241;</button>

                    <button className={`shrink-0 material-symbols-outlined text-[22px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe178;</button>
                    <button className={`shrink-0 material-symbols-outlined text-[22px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe238;</button>
                    <button className={`shrink-0 material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe257;</button>
                </div>
                <button onClick={() => handleClick('prev')} className={`${(scrollPosition === 'start' || !showButtons) && 'hidden'} material-symbols-outlined text-[20px] absolute top-0 left-0 h-[36px] w-6 bg-white hover:bg-gray-100 border-r-[0.1px] border-gray-300 rounded-l-md z-10`}>&#xe5cb;</button>
                <button onClick={() => handleClick('next')} className={`${(scrollPosition === 'end' || !showButtons) && 'hidden'} material-symbols-outlined text-[20px] absolute top-0 right-0 h-[36px] w-6 bg-white hover:bg-gray-100 border-l-[0.1px] border-gray-300 rounded-r-md z-10`}>&#xe5cc;</button>
            </div>
            <div className={'flex gap-3'}>
                <div className={'max-[851.9px]:hidden p-0.5 flex items-center gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md'}>
                    <KeynoteButton/>
                    <button className={`px-2.5 h-8 text-sm rounded-md hover:bg-gray-100 font-semibold`}>Connect</button>
                    <button className={`px-2.5 h-8 text-sm text-red-700 rounded-md hover:bg-gray-100 font-semibold`}>Detach</button>
                </div>
                <button className={'min-[852px]:hidden material-symbols-outlined text-[22px] w-[36px] h-[36px] bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xe5d3;</button>
                <SaveEventButton/>
            </div>
        </div>
    );
};

export default NewEventEditMenubar;