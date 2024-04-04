import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {getClickOrTouch, getIsTouchable, sum} from "@/utils/global";
import Image from "next/image";

const TimelineListRelated = () => {
    const swiperContainerRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState('start');
    const [showButtons, setShowButtons] = useState(false)

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

        const swiperContainerChildren = Array.from(swiperContainer.children)
        const childWidths = swiperContainerChildren.map(child => child.clientWidth)
        const childLefts = swiperContainerChildren.map((_, i) => sum(childWidths.slice(0,i)))

        if (direction === 'prev') {
            let targetIndexForPrev = childLefts.findIndex(left => left >= swiperContainer.scrollLeft)
            if (targetIndexForPrev % 2 !== 0) targetIndexForPrev += 1
            swiperContainerChildren[targetIndexForPrev].scrollIntoView({inline: "end", behavior: 'smooth', block: 'nearest'})
        } else {
            let targetIndexForNext = childLefts.findLastIndex(left => left < swiperContainer.scrollLeft + swiperContainer.clientWidth)
            if (targetIndexForNext % 2 !== 0) targetIndexForNext -= 1
            swiperContainerChildren[targetIndexForNext].scrollIntoView({inline: "start", behavior: 'smooth', block: 'nearest'})
        }
    }

    return (
        <div className={'flex flex-col'}>
            <div className={'flex items-center justify-between'}>
                <h3 className={'text-[20px] py-3 font-bold'}>Related</h3>
                <div className={`flex gap-2.5 ${!showButtons && 'hidden'}`}>
                    <button onClick={() => handleClick('prev')} className={`flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1px] border-gray-200 bg-white ${scrollPosition === 'start' ? 'opacity-30' : 'hover:bg-gray-100'}`}><Image src={'/svg/before.svg'} alt={'before'} height={20} width={20} className={'opacity-80'}/></button>
                    <button onClick={() => handleClick('next')} className={`flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1px] border-gray-200 bg-white ${scrollPosition === 'end' ? 'opacity-30' : 'hover:bg-gray-100'}`}><Image src={'/svg/after.svg'} alt={'after'} height={20} width={20} className={'opacity-80'}/></button>
                </div>
            </div>
            <div ref={swiperContainerRef} className={`relatedSwiper flex gap-2 pb-3 w-full overflow-x-scroll`}>
                <div className={'h-[30px] whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>Saudi Arabia</div>
                <div className={'h-[30px] whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>King Saud University</div>
                <div className={'h-[30px] whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>Neom City</div>
                <div className={'h-[30px] whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>Saudi Aramco</div>
                <div className={'h-[30px] whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>Public Investment Fund</div>
            </div>
        </div>
    );
};

export default TimelineListRelated;
