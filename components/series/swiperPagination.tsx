import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import swiperPagination from "@/components/series/swiperPagination";
import {hidden} from "next/dist/lib/picocolors";
import swiperCard from "@/components/series/swiperCard";
import {getClickOrTouch} from "@/utils/global";

const SwiperPagination = ({swiperContainerRef} : {swiperContainerRef: React.RefObject<HTMLDivElement>}) => {
    const [showPagination, setShowPagination] = useState(false)
    const [scrollPosition, setScrollPosition] = useState('start');
    const [isTouch, setIsTouch] = useState(true)

    useEffect(() => {
        if (getClickOrTouch() === 'click') setIsTouch(false)
    }, []);

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

        const swiperCards = Array.from(swiperContainer.children)
        const maxIndex = swiperCards.length
        let indexInterval = Math.floor(swiperContainer.clientWidth/(swiperCards[0].clientWidth + 16))
        if (swiperContainer.clientWidth === 964) indexInterval = 5
        if (direction === 'prev') {
            const currentIndex = Math.floor(maxIndex - (swiperContainer.scrollWidth - swiperContainer.scrollLeft - swiperContainer.clientWidth)/(swiperCards[0].clientWidth + 16))
            let resultIndex = swiperContainer.clientWidth === 964 ? currentIndex - indexInterval - 1 : currentIndex - indexInterval
            let targetSwiperCard = resultIndex > 0 ? swiperCards[resultIndex] : swiperCards[0]
            targetSwiperCard.scrollIntoView({inline: "end",behavior: 'smooth', block: 'nearest'})
        } else {
            const currentIndex = Math.floor(swiperContainer.scrollLeft/(swiperCards[0].clientWidth + 16))
            // const indexInterval = Math.floor(swiperContainer.clientWidth/(swiperCards[0].clientWidth + 16)) + 1
            let targetSwiperCard = currentIndex + indexInterval < maxIndex ? swiperCards[currentIndex + indexInterval] : swiperCards[maxIndex]
            targetSwiperCard.scrollIntoView({inline: "start",behavior: 'smooth', block: 'nearest'})
        }
    }

    return (
        <div className={`flex gap-2.5 ${(!showPagination || isTouch) && 'hidden'}`}>
            <button onClick={() => handleClick('prev')} className={`flex items-center justify-center w-[32px] h-[32px] rounded-full border-[1px] border-gray-200 bg-white ${scrollPosition === 'start' ? 'opacity-30' : 'hover:bg-gray-100'}`}><Image src={'/svg/before.svg'} alt={'before'} height={20} width={20} className={'opacity-80'} /></button>
            <button onClick={() => handleClick('next')} className={`flex items-center justify-center w-[32px] h-[32px] rounded-full border-[1px] border-gray-200 bg-white ${scrollPosition === 'end' ? 'opacity-30' : 'hover:bg-gray-100'}`}><Image src={'/svg/after.svg'} alt={'after'} height={20} width={20} className={'opacity-80'} /></button>
        </div>
    );
};

export default SwiperPagination;
