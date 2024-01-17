import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Image from "next/image";
import {getEventHeights, sum} from "@/utils/global";
import api from "@/utils/api";
import AddSVG from "@/public/svg/add.svg";
import RemoveSVG from "@/public/svg/remove.svg";
import NorthSVG from "@/public/svg/north.svg";

import {decrementDepth, incrementDepth, selectAboveTimelineHeight, selectCurrentDepth, selectEventBoxHeight, selectLastAction, selectMaxDepth, selectOverlapBottom, selectToolbarStatus, updateAfterEffectTop, updateCurrentDepth, updateIsBottomEnd, updateIsTimelineInfo, updateIsTopEnd, updateLastAction, updateScrollTop, updateToolbarStatus, updateTotalHeight} from "@/store/slices/appearanceSlice";
import {selectCurrentEvents, selectCurrentTimeline, TimelineEvent, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect} from "@/store/slices/contentsSlice";

const Toolbar = () => {
    const dispatch = useDispatch()
    const aboveTimelineHeight = useSelector(selectAboveTimelineHeight)
    const eventBoxHeight = useSelector(selectEventBoxHeight)
    const overlapBottom = useSelector(selectOverlapBottom)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentDepth = useSelector(selectCurrentDepth)
    const maxDepth = useSelector(selectMaxDepth)
    const lastAction = useSelector(selectLastAction)
    const toolbarStatus = useSelector(selectToolbarStatus)

    const zoomPercentage = Math.floor(currentDepth / maxDepth * 100)

    let isLoading = true
    if (lastAction === 'zoom' || lastAction === 'scroll') {setTimeout(() => {isLoading = false}, 500)}
    else {isLoading = false}

    useEffect(() => {
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        const toolbarButtons: NodeListOf<HTMLButtonElement> | null = typeof window !== 'undefined' ? document.querySelectorAll('.toolbarButton') : null
        if (!toolbarButtons || !scrollWrapper) return

        const CurrentEventHeights = getEventHeights(currentEvents)
        let CurrentEventTops = CurrentEventHeights.map((_, i) => sum(CurrentEventHeights.slice(0,i)))

        const getSwipedEvent = (scrollWrapper: HTMLDivElement) : TimelineEvent => {
            let clientYInContainer = scrollWrapper.scrollTop + scrollWrapper.clientHeight/2
            let order = 0
            if (clientYInContainer - aboveTimelineHeight > 0) order = CurrentEventTops.findLastIndex(top => top < clientYInContainer - aboveTimelineHeight)
            let top = CurrentEventTops[order] + aboveTimelineHeight - scrollWrapper.scrollTop
            let boxTop = top
            if (currentEvents[order].isToggle) {
                let clientYInBox = clientYInContainer - (CurrentEventTops[order] + aboveTimelineHeight)
                let orderInBox = 0
                if (clientYInBox > 38) {orderInBox = Math.floor((clientYInBox - 38) / 124)}
                boxTop = 38 + orderInBox * 124
            }
            return {...currentEvents[order], order: order, top: top, boxTop: boxTop}
        }
        const fetchEvents = async (depth: number, pivotEvent: TimelineEvent) => {
            if (depth === maxDepth + 1 || depth === -1) return {fetchedEvents: currentEvents, referEvent: pivotEvent}
            try {
                const response = await api.post('/v1/getTimeline', {'timelineId': currentTimeline.id , 'depth': depth, 'pivotJulianDate': pivotEvent.julianDate})
                let fetchedEvents = response.data.data.events as TimelineEvent[]
                fetchedEvents = fetchedEvents.map(fEvent => {
                    return {...fEvent, isToggle: false, toggleEvents: []}
                })
                fetchedEvents = fetchedEvents.map(fEvent => {
                    const cEvent = currentEvents.find(cEvent => cEvent.id === fEvent.id)
                    if (cEvent) return cEvent
                    else return fEvent
                })
                const referEvent = fetchedEvents.find(fEvent => fEvent.id === response.data.data.pivotEventId) as TimelineEvent
                const isTopEnd = response.data.data.isTopEnd
                const isBottomEnd = response.data.data.isBottomEnd
                return {fetchedEvents, referEvent, isTopEnd, isBottomEnd}
            } catch (error) {
                console.error('Error fetching data in useEffect:', error);
                return {fetchedEvents: currentEvents, referEvent: pivotEvent}
            }
        }
        const getEventsWithEffectForZoom = (depth: number, swipedEvent: TimelineEvent, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[])=> {
            const referEventOrderInFetched = fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)
            const heightsOfFetchedEvents = getEventHeights(fetchedEvents)
            const topsOfFetchedEvents = heightsOfFetchedEvents.map((_, i) => sum(heightsOfFetchedEvents.slice(0,i)))

            const fetchedEventsWithEffect = fetchedEvents.map((fEvent, i) => {
                let distance = 0
                const fEventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id)
                const fEventOrderInFetched = i
                if (currentEvents.find(cEvent => cEvent.id === fEvent.id)) {
                    // remained
                    if (depth < currentDepth && !fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle && swipedEvent.boxTop) {
                        let initialDistance = (CurrentEventTops[swipedEvent.order as number] + swipedEvent.boxTop) - CurrentEventTops[fEventOrderInCurrent]
                        let finalDistance = topsOfFetchedEvents[referEventOrderInFetched] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    } else {
                        let initialDistance = CurrentEventTops[swipedEvent.order as number] - CurrentEventTops[fEventOrderInCurrent]
                        let finalDistance = topsOfFetchedEvents[referEventOrderInFetched] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    }
                } else {
                    // new
                    if (depth < currentDepth) {
                        let initialDistance
                        if (fEventOrderInFetched <= referEventOrderInFetched) initialDistance = CurrentEventTops[swipedEvent.order as number] + (eventBoxHeight + 2 * overlapBottom)
                        else initialDistance = CurrentEventTops[swipedEvent.order as number] - (CurrentEventTops[CurrentEventTops.length - 1] + (eventBoxHeight + 2 * overlapBottom))
                        let finalDistance = topsOfFetchedEvents[referEventOrderInFetched] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    } else return {...fEvent, animation: 'fadeIn'}
                }
                return {...fEvent, animation: 'move' , distance: distance}
            })
            const currentEventsWithAfterEffect = currentEvents.map((cEvent, i) => {
                let distance = 0
                let cEventOrderInCurrent = i
                if (!fetchedEvents.find(fEvent => fEvent.id === cEvent.id)) {
                    //disappeared
                    if (depth > currentDepth) {
                        let initialDistance = CurrentEventTops[swipedEvent.order as number] - CurrentEventTops[cEventOrderInCurrent]
                        let finalDistance
                        if (cEventOrderInCurrent <= (swipedEvent.order as number)) finalDistance = topsOfFetchedEvents[referEventOrderInFetched] + (eventBoxHeight + 2 * overlapBottom)
                        else finalDistance = topsOfFetchedEvents[referEventOrderInFetched] - (topsOfFetchedEvents[topsOfFetchedEvents.length - 1] + (eventBoxHeight + 2 * overlapBottom))
                        distance = initialDistance - finalDistance
                        return {...cEvent, animation: 'move' ,distance: distance, prev: true}
                    } else return {...cEvent, animation: 'fadeOut' , prev: true}
                } else return {...cEvent, animation: 'blank', prev: true}
            })
            let afterEffectTop = topsOfFetchedEvents[referEventOrderInFetched] - CurrentEventTops[swipedEvent.order as number]
            if (depth < currentDepth && !fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle && swipedEvent.boxTop) {
                afterEffectTop -= swipedEvent.boxTop
            }
            return {fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop}
        }
        const getEventsWithEffectForScroll = (fetchedEvents: TimelineEvent[]) => {
            return fetchedEvents.map(fEvent => {
                const cEvent = currentEvents.find(cEvent => cEvent.id === fEvent.id)
                if (cEvent) return {...fEvent, animation: 'none' }
                else return {...fEvent, animation: 'fadeIn' }
            })
        }
        const getScrollTop = (swipedEvent: TimelineEvent, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
            if (!swipedEvent.top) return {newScrollTop: 0, totalHeight: 0}
            const heightsOfFetchedEvents = getEventHeights(fetchedEvents)
            const topsOfFetchedEvents = heightsOfFetchedEvents.map((_, i) => sum(heightsOfFetchedEvents.slice(0,i)))
            let topInContainer = aboveTimelineHeight + topsOfFetchedEvents[fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)]
            let newScrollTop = topInContainer - swipedEvent.top
            // if swipedEvent toggled and disappeared
            if (!fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle && swipedEvent.boxTop !== undefined) {newScrollTop -= swipedEvent.boxTop}
            return {newScrollTop: newScrollTop, totalHeight: sum(heightsOfFetchedEvents)}
        }
        const operateZoom = (classNames: DOMTokenList) => {
            if (classNames.contains('status')) return
            let depth = classNames.contains('first') ? 0 : classNames.contains('zoomOut') ? currentDepth - 1 : classNames.contains('zoomIn') ? currentDepth + 1 : maxDepth
            let swipedEvent: TimelineEvent = getSwipedEvent(scrollWrapper)
            fetchEvents(depth, swipedEvent).then(({fetchedEvents, referEvent, isTopEnd, isBottomEnd}) => {
                if (fetchedEvents === currentEvents) return
                let { fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop } = getEventsWithEffectForZoom(depth, swipedEvent, referEvent, fetchedEvents)
                let { newScrollTop, totalHeight} = getScrollTop(swipedEvent, referEvent, fetchedEvents)
                dispatch(updateCurrentEvents(fetchedEvents))
                dispatch(updateCurrentEventsWithEffect(fetchedEventsWithEffect))
                dispatch(updatePrevEventsWithEffect(currentEventsWithAfterEffect))
                dispatch(updateAfterEffectTop(afterEffectTop))
                dispatch(updateScrollTop(newScrollTop))
                dispatch(updateTotalHeight(totalHeight))
                dispatch(updateLastAction('zoom'))
                if (isTopEnd !== undefined && isBottomEnd !== undefined) {
                    dispatch(updateIsTopEnd(isTopEnd))
                    dispatch(updateIsBottomEnd(isBottomEnd))
                }
                classNames.contains('first') ? dispatch(updateCurrentDepth(0)) : classNames.contains('zoomOut') ? dispatch(decrementDepth()) : classNames.contains('zoomIn') ? dispatch(incrementDepth()) : dispatch(updateCurrentDepth(maxDepth))
            })
        }
        const operateScroll = async (scrollUp: boolean) => {
            let order =  0
            let top = 0
            const scrollEvent = {...currentEvents[order], julianDate: "0", order: order, top: top}
            await fetchEvents(currentDepth, scrollEvent).then(({fetchedEvents, referEvent, isTopEnd, isBottomEnd}) => {
                if (fetchedEvents.every(fEvent => currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) !== -1)) {
                    scrollWrapper.scrollTop = 0
                    return
                }
                fetchedEvents = getEventsWithEffectForScroll(fetchedEvents)
                let newScrollTop = 0
                let totalHeight = sum(getEventHeights(fetchedEvents))
                setTimeout(() => {
                    dispatch(updateCurrentEvents(fetchedEvents))
                    dispatch(updateCurrentEventsWithEffect(fetchedEvents))
                    dispatch(updateScrollTop(newScrollTop))
                    dispatch(updateTotalHeight(totalHeight))
                    dispatch(updateLastAction('scroll'))
                    if (isTopEnd !== undefined && isBottomEnd !== undefined) {
                        dispatch(updateIsTopEnd(isTopEnd))
                        dispatch(updateIsBottomEnd(isBottomEnd))
                    }
                }, 500)
            })
        }

        const handleClick = async (e: MouseEvent) => {
            const toolbarButton = e.currentTarget as HTMLButtonElement
            const classNames = toolbarButton.classList
            if (!isLoading) {
                isLoading = true
                if (classNames.contains('uppermost')) {
                    await operateScroll(true)
                    setTimeout(() => isLoading = false, 500)
                } else {
                    await operateZoom(classNames)
                    setTimeout(() => isLoading = false, 500)
                }
            }
        }

        toolbarButtons?.forEach(toolbarButton => toolbarButton.addEventListener('click', handleClick))
        return () => {
            toolbarButtons?.forEach(toolbarButton => toolbarButton.removeEventListener('click', handleClick))
        }
    });

    return (
        <div className={'bottom-[22px] fixed left-1/2 transform -translate-x-1/2 flex items-center justify-center w-full max-w-lg'} style={{zIndex: 4998}}>
            <div className={`${toolbarStatus === "expand" ? 'bottom-0' : 'bottom-[-40px]' } fixed left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[140px] h-[40px] border-[1px] rounded-3xl bg-white drop-shadow-md`}>
                <div className={'flex items-center'}>
                    <button className={'toolbarButton zoomIn px-[6px] '}><Image src={AddSVG} alt={'plus'} draggable={false}/></button>
                    <button className={'toolbarButton status w-[38px] mx-[6px] text-[14px] font-semibold flex justify-center z-30'}><span>{zoomPercentage}</span><span>%</span></button>
                    <button className={'toolbarButton zoomOut px-[6px]'}><Image src={RemoveSVG} alt={'minus'} draggable={false}/></button>
                </div>
            </div>
            <div className={'bottom-0 fixed right-[20px] flex items-center justify-center'}>
                <div className={'toolbarButton uppermost flex items-center justify-center w-[40px] h-[40px] border-[1px] rounded-3xl bg-white/50 drop-shadow-md'} style={{zIndex: 100}}>
                    <button><Image src={NorthSVG} alt={'uppermost'} height={20} width={20}/></button>
                </div>
            </div>
        </div>
    );
};

export default Toolbar;
