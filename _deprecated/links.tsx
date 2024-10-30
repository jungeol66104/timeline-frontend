import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectCurrentEvent, selectCurrentTimeline, selectRelatedTimelines} from "@/store/slices/contentsSlice";
import {getIsTouchable} from "@/utils/global";

const Links = () => {
    const swiperContainerRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState('start');
    const [showButtons, setShowButtons] = useState(false)
    const [links, setLinks] = useState([] as string[])

    const relatedTimelines = useSelector(selectRelatedTimelines)

    const modalType = useSelector(selectModalType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvent = useSelector(selectCurrentEvent)
    const htmlChunk = modalType === 'information' ? currentTimeline.content : currentEvent.content

    useLayoutEffect(() => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlChunk;
        const anchorTags = tempElement.querySelectorAll('a');
        const links = Array.from(anchorTags).map(anchor => anchor.href);
        console.log(links)

        async function fetchLinkMetadata(url: string) {
            try {
                const response = await fetch(`/api/getLinkMeta?url=${encodeURIComponent(url)}`);
                const data = await response.json();
                return {
                    thumbnail: data.thumbnail || 'default-thumbnail.jpg',
                    title: data.title || 'No Title',
                    description: data.description || 'No description available.',
                    url,
                };
            } catch (error) {
                console.error('Error fetching link metadata:', error);
                return null;
            }
        }

        setLinks(links)
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
        <div className={`${links.length < 1 && 'hidden'} py-3 w-full flex flex-col gap-3 border-[0.1px] border-gray-300 rounded-2xl`}>
            <div className={'px-3 flex items-center justify-between'}>
                <h3 className={'text-[20px] font-bold'}>Links</h3>
                <div className={`flex gap-2.5 ${!showButtons && 'hidden'}`}>
                    <button onClick={() => handleClick('prev')} className={`material-symbols-outlined text-[20px] flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1px] border-gray-200 bg-white ${scrollPosition === 'start' ? 'opacity-30' : 'hover:bg-gray-100'}`}>&#xe5cb;</button>
                    <button onClick={() => handleClick('next')} className={`material-symbols-outlined text-[20px] flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1px] border-gray-200 bg-white ${scrollPosition === 'end' ? 'opacity-30' : 'hover:bg-gray-100'}`}>&#xe5cc;</button>
                </div>
            </div>
            <div ref={swiperContainerRef} className={`relatedSwiper px-3 flex gap-2 w-full overflow-x-scroll`}>
                {links.map(link => {
                    return <Link key={link} href={link} className={'h-[30px] whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>{link}</Link>
                })}
            </div>
        </div>
    );
};

export default Links;
