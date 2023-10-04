import Image from "next/image";
import CloseSVG from "../public/svg/close.svg"
import SearchSVG from "@/public/svg/searchWhite.svg";
import {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {updateIsSearch} from "@/store/slices/searchSlice";

const Search = () => {
    const dispatch = useDispatch()
    const isSearch = useSelector((state: RootState) => state.reducer.search.isSearch)

    return (
        <>
            <div onClick={() => dispatch(updateIsSearch())} className={`absolute ${isSearch ? '' : 'pointer-events-none'} top-0 left-0 h-screen w-screen bg-gray-900 z-30 transform transition-opacity ease-in-out duration-300 ${isSearch ? 'opacity-40' : 'opacity-0'}`}></div>
            <div className={`fixed bottom-[-98vh] h-[98vh] w-full rounded-t-2xl bg-white z-30 transform transition-transform ease-in-out duration-300 ${isSearch ? '-translate-y-full' : 'translate-y-full'}`}>
                <SearchHeader />
                <SearchBodyBefore />
            </div>
        </>
    )
}

export default Search

const SearchHeader = () => {
    const searchBarInputRef: RefObject<HTMLInputElement> = useRef(null)

    const dispatch = useDispatch()
    const isSearch = useSelector((state: RootState) => state.reducer.search.isSearch)

    useEffect(() => {
     const searchBarInput = searchBarInputRef.current
     if (!searchBarInput) return;
     if(isSearch)
        searchBarInput.focus()
    }, [isSearch]);

    return (
         <>
             <div className={'flex justify-between pl-5 pr-5 pb-2.5 pt-2.5 align-middle border-b-[1px]'}>
                 <div className={'w-5 h-5'}></div>
                 <span className={'font-black text-md pt-[2.5px]'}>검색</span>
                 <button><Image src={CloseSVG} alt={'close'} width={22} height={22} onClick={() => dispatch(updateIsSearch())} /></button>
             </div>
            <div className={'flex gap-2.5 ml-4 mr-4 pt-2.5 pb-2.5 border-b-[1px]'}>
                <div className={'flex-shrink-0 w-7 h-7 bg-gray-500 rounded-full flex align-middle justify-center'}><Image src={SearchSVG} alt={'search'} width={18} height={18} /></div>
                <input ref={searchBarInputRef} className={'w-full focus:outline-0'}></input>
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