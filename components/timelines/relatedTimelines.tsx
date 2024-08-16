import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import Link from "next/link";
import Image from "next/image";
import {selectRelatedTimelines} from "@/store/slices/contentsSlice";
import {getIsTouchable} from "@/utils/global";
import {selectTimelineType} from "@/store/slices/appearanceSlice";

const RelatedTimelines = () => {
    const swiperContainerRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState('start');
    const [showButtons, setShowButtons] = useState(false)

    const timelineType = useSelector(selectTimelineType)
    const relatedTimelines = useSelector(selectRelatedTimelines)


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
        <div className={`${timelineType !== 'public' && 'hidden'} py-3 flex flex-col gap-3 border-[1px] border-gray-300 rounded-2xl`}>
            <div className={'px-3 flex items-center justify-between'}>
                <h3 className={'text-[20px] font-bold'}>Related</h3>
                <div className={`flex gap-2.5 ${!showButtons && 'hidden'}`}>
                    <button onClick={() => handleClick('prev')} className={`flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1px] border-gray-200 bg-white ${scrollPosition === 'start' ? 'opacity-30' : 'hover:bg-gray-100'}`}><Image src={'/svg/before.svg'} alt={'before'} height={20} width={20} className={'opacity-80'}/></button>
                    <button onClick={() => handleClick('next')} className={`flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1px] border-gray-200 bg-white ${scrollPosition === 'end' ? 'opacity-30' : 'hover:bg-gray-100'}`}><Image src={'/svg/after.svg'} alt={'after'} height={20} width={20} className={'opacity-80'}/></button>
                </div>
            </div>
            <div ref={swiperContainerRef} className={`relatedSwiper px-3 flex gap-2 w-full overflow-x-scroll`}>
                {relatedTimelines.map(relatedTimeline => {
                    return <Link key={relatedTimeline.id} href={`/timelines/${relatedTimeline.id}`} className={'h-[30px] whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>{relatedTimeline.name}</Link>
                })}
            </div>
        </div>
    );
};

export default RelatedTimelines;
