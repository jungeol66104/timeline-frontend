import Image from "next/image";
import CloseSVG from "../public/svg/close.svg"
import SearchInBarSVG from "@/public/svg/searchInBar.svg";
import NorthwestSVG from '@/public/svg/northwest.svg'
import React, {ChangeEvent, RefObject, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {updateIsSearch, updateSearchValue, updateTab} from "@/store/slices/searchSlice";
import dummyEvents, {TimelineEvent} from "@/public/events";

const Search = () => {
    const dispatch = useDispatch()
    const isSearch = useSelector((state: RootState) => state.reducer.search.isSearch)

    return (
        <>
            <div onClick={() => dispatch(updateIsSearch())} className={`absolute ${isSearch ? '' : 'pointer-events-none'} top-0 left-0 h-screen w-screen bg-gray-900 z-30 transform transition-opacity ease-in-out duration-300 ${isSearch ? 'opacity-40' : 'opacity-0'}`}></div>
            <div className={`fixed bottom-[-98vh] h-[98vh] w-full rounded-t-2xl bg-white z-30 transform transition-transform ease-in-out duration-300 ${isSearch ? '-translate-y-full' : 'translate-y-full'}`}>
                <SearchHeader />
                <SearchBody />
            </div>
        </>
    )
}

export default Search

const SearchHeader = () => {
    const searchBarInputRef: RefObject<HTMLInputElement> = useRef(null)

    const dispatch = useDispatch()
    const isSearch = useSelector((state: RootState) => state.reducer.search.isSearch)
    const searchValue = useSelector((state: RootState) => state.reducer.search.searchValue)

    const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        dispatch(updateSearchValue(query))
    }

    useEffect(() => {
     const searchBarInput = searchBarInputRef.current
     if (!searchBarInput) return;
     if(isSearch)
        searchBarInput.focus()
    }, [isSearch]);

    return (
         <div className={''}>
             <div className={'h-[50px] flex justify-between pl-5 pr-5 pb-2.5 pt-2.5 align-middle border-b-[1px]'}>
                 <div className={'w-5 h-5'}></div>
                 <span className={'font-black text-md pt-[2.5px]'}>검색</span>
                 <button><Image src={CloseSVG} alt={'close'} width={22} height={22} onClick={() => dispatch(updateIsSearch())} /></button>
             </div>
             <div className={'h-[50px] flex gap-2.5 ml-4 mr-4 pt-2.5 pb-2.5 border-b-[1px]'}>
                <div className={'flex-shrink-0 w-7 h-7 bg-gray-500 rounded-full flex align-middle justify-center'}><Image src={SearchInBarSVG} alt={'searchInBar'} width={16} height={16} /></div>
                <input ref={searchBarInputRef} onChange={handelSearch} value={searchValue} placeholder={'Search...'} className={'w-full focus:outline-0'}></input>
             </div>
             <SearchTab />
         </div>
     )
}

const SearchTab = () => {
    const dispatch = useDispatch()
    const tab = useSelector((state: RootState) => state.reducer.search.tab)

    return (
        <div className={'h-fit flex flex-col ml-4 mr-4'}>
            <div className={'flex'}>
                <div onClick={() => dispatch(updateTab(0))} className={`cursor-pointer pt-2.5 pb-2.5 w-1/2 text-center transition-colors duration-300 ease-in-out ${tab === 0 ? 'text-gray-600' : 'text-gray-400' } font-semibold text-[14px]`}>타임라인</div>
                <div onClick={() => dispatch(updateTab(1))} className={`cursor-pointer pt-2.5 pb-2.5 w-1/2 text-center transition-colors duration-300 ease-in-out ${tab === 1 ? 'text-gray-600' : 'text-gray-400' }  font-semibold text-[14px]`}>이벤트</div>
            </div>
            <div className={`w-1/2 border-b-2 border-gray-500 transform transition-transform ease-in-out duration-300 ${tab === 0 ? '-translate-x-0' : 'translate-x-full'}`}></div>
        </div>
    )
}

const SearchBody = () => {
    const tab = useSelector((state: RootState) => state.reducer.search.tab)

    return (
        <div className={`flex w-fit transform transition-transform ease-in-out duration-300 ${tab === 0 ? 'translate-x-0' : '-translate-x-1/2'}`}>
            <div className={'page w-screen overflow-scroll'} style={{height: `calc(98vh - 143px)`}}>
            {Array(20).fill(0).map((l, i) => {
                return <SearchResultBox key={i}/>
            })}
            </div>
            <div className={'page w-screen overflow-scroll'} style={{height: `calc(98vh - 143px)`}}>
            {dummyEvents.map((event, i) => {
                return <SearchResultBox event={event} key={i}/>
            })}
            </div>
        </div>
    )
}

const SearchResultBox = ({event}: {event?: TimelineEvent}) => {
    return (
        <div className={'flex items-center pt-[12px] pb-[12px] gap-2.5'}>
            <div><Image src={NorthwestSVG} alt={'northwest'} width={20} height={20} /></div>
            <div className={'font-black'}>{event ? '이벤트' : `타임라인` }</div>
            <div className={'text-sm text-gray-500'}>{event ? '0000. 00. 00.' :`#`}</div>
        </div>
    )
}