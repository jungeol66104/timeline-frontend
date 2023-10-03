import Image from "next/image";
import CloseSVG from "../public/svg/close.svg"
import SearchSVG from "@/public/svg/searchWhite.svg";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const Search = () => {
    return (
        <>
            <BackGround />
            <div className={'fixed bottom-0 h-[98vh] w-full rounded-t-2xl bg-white z-30'}>
                <SearchHeader />
                <SearchBodyBefore />
            </div>
        </>
    )
}

export default Search

const BackGround = () => {
    return (
        <div className={'absolute top-0 left-0 h-screen w-screen bg-black animate-fadeInForSearch z-30'}></div>
    )
}

const SearchHeader = () => {
    const searchBarInputRef = useRef(null)

    const isSearch = useSelector((state: RootState) => {state.reducer.search.isSearch})

    useEffect(() => {
     const searchBarInput = searchBarInputRef.current
     if (!isSearch) return



    });

    return (
         <>
             <div className={'flex justify-between pl-4 pr-4 pb-2.5 pt-2.5 align-middle border-b-[1px]'}>
                 <div className={'w-5 h-5'}></div>
                 <span className={'font-black text-md pt-[2.5px]'}>검색</span>
                 <button><Image src={CloseSVG} alt={'close'} width={22} height={22} /></button>
             </div>
            <div className={'flex gap-2.5 ml-4 mr-4 pt-2.5 pb-2.5 border-b-[1px]'}>
                <div className={'w-7 h-7 bg-gray-500 rounded-full flex align-middle justify-center'}><Image src={SearchSVG} alt={'search'} width={18} height={18} /></div>
                <input ref={searchBarInputRef} className={'focus:outline-0 bg-gray-600'}></input>
            </div>
         </>
     )
}

const SearchBodyBefore = () => {
    return (
        <>
        </>
    )
}

const SearchBodyAfter = () => {
    return (
        <div className={'flex ml-4 mr-4 '}>
            <div className={'pt-2.5 pb-2.5 w-1/2 text-center text-gray-600 font-semibold text-[14px] border-b-2 border-gray-500'}>타임라인</div>
            <div className={'pt-2.5 pb-2.5 w-1/2 text-center text-gray-400 font-semibold text-[14px]'}>이벤트</div>
        </div>
    )
}