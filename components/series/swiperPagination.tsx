import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {getClickOrTouch, sum} from "@/utils/global";

const SwiperPagination = ({swiperContainerRef} : {swiperContainerRef: React.RefObject<HTMLDivElement>}) => {
    const [showPagination, setShowPagination] = useState(false)
    const [scrollPosition, setScrollPosition] = useState('start');
    const [isTouch, setIsTouch] = useState(true)

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
        if (getClickOrTouch() !== 'click') return
        if (!swiperContainer) return

        const handleResize = () => {
            const hasScroll = swiperContainer.scrollWidth > swiperContainer.clientWidth
            if (hasScroll) setShowPagination(true)
            else setShowPagination(false)
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
        <div className={`flex gap-2.5 ${(!showPagination || isTouch) && 'hidden'}`}>
            <button onClick={() => handleClick('prev')} className={`flex items-center justify-center w-8 h-8 max-[525px]:w-6 max-[525px]:h-6 rounded-full border-[1px] border-gray-200 bg-white ${scrollPosition === 'start' ? 'opacity-30' : 'hover:bg-gray-100'}`}><Image src={'/svg/before.svg'} alt={'before'} height={20} width={20} className={'opacity-80'} /></button>
            <button onClick={() => handleClick('next')} className={`flex items-center justify-center w-8 h-8 max-[525px]:w-6 max-[525px]:h-6 rounded-full border-[1px] border-gray-200 bg-white ${scrollPosition === 'end' ? 'opacity-30' : 'hover:bg-gray-100'}`}><Image src={'/svg/after.svg'} alt={'after'} height={20} width={20} className={'opacity-80'} /></button>
        </div>
    )
}
export default SwiperPagination;
