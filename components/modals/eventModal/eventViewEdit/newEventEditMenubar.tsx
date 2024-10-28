import React, {useEffect, useRef, useState} from 'react';
import KeynoteButton from "@/components/modals/eventModal/eventViewEdit/keynoteButton";
import SaveEventButton from "@/components/modals/eventModal/eventViewEdit/saveEventButton";

import {Editor} from "@tiptap/core";
import DetachButton from "@/components/modals/eventModal/eventViewEdit/detachButton";
import AddImageButton from "@/components/common/addImageButton";
import {useSelector} from "react-redux";
import {selectEventContentType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents} from "@/store/slices/contentsSlice";
import EventEditMoreButton from "@/components/modals/eventModal/eventViewEdit/eventEditMoreButton";
import EventEditRelationshipMenubar from "@/components/modals/eventModal/eventViewEdit/eventEditRelationshipMenubar";

const NewEventEditMenubar = ({editor}: {editor: Editor | null}) => {
    const swiperWrapperRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState('start');
    const [showButtons, setShowButtons] = useState(false)

    const contentType = useSelector(selectEventContentType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    useEffect(() => {
        const swiperWrapper = swiperWrapperRef.current
        if (!swiperWrapper) return

        const handleScroll = () => {
            if (swiperWrapper.scrollLeft <= 0) setScrollPosition('start')
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
        if (!swiperWrapper) return

        const handleResize = () => {
            const hasScroll = swiperWrapper.scrollWidth > swiperWrapper.clientWidth
            if (hasScroll) setShowButtons(true)
            else setShowButtons(false)
        }

        const observer = new ResizeObserver(handleResize)
        observer.observe(swiperWrapper)
        return () => {
            observer.disconnect()
        }
    });
    const handleClick = (direction: string) => {
        editor?.chain().focus()
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
            <div className={'relative overflow-hidden max-w-[307.33px] h-9 flex items-center border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md'}>
                <div onClick={() => handleClick('prev')} className={`${(scrollPosition === 'start' || !showButtons) && 'hidden'} cursor-pointer absolute top-0 left-0 w-6 h-full flex items-center justify-center bg-white opacity-100 hover:bg-gray-100 border-r-[0.1px] border-gray-300 rounded-l-md`}><span className={`material-symbols-outlined text-[20px]`}>&#xe5cb;</span></div>
                <div onClick={() => handleClick('next')} className={`${(scrollPosition === 'end' || !showButtons) && 'hidden'} cursor-pointer absolute top-0 right-0 w-6 h-full flex items-center justify-center bg-white opacity-100 hover:bg-gray-100 border-l-[0.1px] border-gray-300 rounded-r-md`}><span className={`material-symbols-outlined text-[20px]`}>&#xe5cc;</span></div>
                <div ref={swiperWrapperRef} className={'swipeWrapper -z-10 p-0.5 overflow-x-scroll w-full flex items-center gap-0.5'}>
                    <AddImageButton/>
                    {/* youtube */}
                    {/*<button className={`shrink-0 pt-[1px] material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xf85a;</button>*/}

                    {/* heading */}
                    <button onClick={() => editor?.chain().focus().toggleHeading({level: 3}).run()} className={`shrink-0 pt-[0.5px] material-symbols-outlined text-[29px] w-9 h-8 rounded-md ${editor?.isActive('heading', {level: 3}) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>&#xf018;</button>
                    {/* table */}
                    {/*<button className={`shrink-0 material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xf191;</button>*/}
                    {/* list */}
                    {/*<button className={`shrink-0 material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe241;</button>*/}

                    {/* link */}
                    {/*<button className={`shrink-0 material-symbols-outlined text-[22px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe157;</button>*/}
                    {/* bold */}
                    <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`shrink-0 material-symbols-outlined text-[22px] w-9 h-8 rounded-md ${editor?.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>&#xe238;</button>
                    {/* strike */}
                    <button onClick={() => editor?.chain().focus().toggleStrike().run()} className={`shrink-0 material-symbols-outlined text-[20px] w-9 h-8 rounded-md ${editor?.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>&#xe257;</button>
                </div>
            </div>
            <div className={'flex gap-3'}>
                <div className={'max-[469.9px]:hidden'}><EventEditRelationshipMenubar /></div>
                <div className={'min-[470px]:hidden'}><EventEditMoreButton/></div>
                {contentType === 'edit' && <SaveEventButton/>}
            </div>
        </div>
    );
};

export default NewEventEditMenubar;