import React, {useRef} from 'react';
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {selectIsSearch, selectSearchValue, updateIsSearch, updateSearchValue} from "@/store/slices/searchSlice";
import useSearch from "@/hooks/useSearch";
import SearchTab from "@/components/layout/search/searchTab";
import SearchList from "@/components/layout/search/searchList";

const ComputerSearchBar = () => {
    const searchBodyRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)
    const searchValue = useSelector(selectSearchValue)

    useSearch()

    const handleClick = (e: React.MouseEvent) => {
        const searchBody = searchBodyRef.current
        const searchInput = searchInputRef.current
        if (!searchBody || !searchInput) return
        e.stopPropagation()
        dispatch(updateIsSearch(true))
        // searchInput.focus()

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!searchBody.contains(e.target as Node)) {
                dispatch(updateIsSearch(false))
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    return (
        <div ref={searchBodyRef} className={`relative max-[850px]:hidden`}>
            <div onClick={handleClick} className={`h-[40px] w-[480px] px-2.5 flex gap-2.5 items-center border-gray-200 ${isSearch ? 'bg-white rounded-t-lg border-t-[1px] border-x-[1px]' : 'bg-gray-100 rounded-lg border-[1px]'}`}>
                <Image src={'/svg/search.svg'} alt={'search'} width={24} height={24} className={`cursor-pointer  ${isSearch ? '': "opacity-30" }`} />
                <input ref={searchInputRef} className={'bg-transparent w-full'} onChange={(e) => dispatch(updateSearchValue(e.target.value))} value={searchValue} placeholder={'Search timelines, events'} style={{outline: 'none'}}/>
            </div>
            <div className={`absolute top-[40px] left-0 h-fit w-[480px] pb-2.5 px-2.5 bg-white shadow-md rounded-b-lg border-[1px] border-gray-200 ${isSearch ? '' : 'hidden'}`}>
                <SearchTab />
                <SearchList />
            </div>
        </div>
    );
};

export default ComputerSearchBar;
