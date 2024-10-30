import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsSearch, selectSearchValue, updateIsSearch, updateSearchValue} from "@/store/slices/searchSlice";
import useSearch from "@/hooks/useSearch";
import SearchList from "@/components/layout/search/searchList";

const MobileSearchBar = () => {
    const searchInputRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)
    const searchValue = useSelector(selectSearchValue)

    useSearch()
    useEffect(() => {
        const searchInput = searchInputRef.current
        if (!searchInput) return

        if (isSearch) searchInput.focus()
    }, [isSearch]);

    return (
        <div className={`absolute top-[10px] right-1.5 max-w-[480px]`} style={{zIndex: 4999, width: `calc(100% - 16px)`}}>
            <div className={`h-[40px] w-full px-2.5 flex gap-2.5 items-center border-gray-200 ${isSearch ? 'bg-white rounded-t-lg border-t-[1px] border-x-[1px]' : 'bg-gray-100 rounded-lg border-[1px]'}`}>
                <button className={`material-symbols-outlined w-[24px] h-[24px] cursor-pointer  ${isSearch ? '' : "opacity-30"}`}>&#xe8b6;</button>
                <div className={'flex w-full'}>
                    <input ref={searchInputRef} className={'bg-transparent w-full'} onChange={(e) => dispatch(updateSearchValue(e.target.value))} value={searchValue} placeholder={'Search timelines'} style={{outline: 'none'}}/>
                    <div className={'flex items-center gap-2'}>
                        {isSearch && searchValue !== '' &&
                            <button onClick={() => dispatch(updateSearchValue(''))} className={'w-4 h-4 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full'}>
                                <div className={'material-symbols-outlined text-[12px] font-light'}>&#xe5cd;</div>
                            </button>}
                        <button onClick={() => dispatch(updateIsSearch(false))} className={'material-symbols-outlined text-[24px] shrink-0 flex items-center justify-center rounded-full bg-white'}>&#xe5cd;</button>
                    </div>
                </div>
            </div>
            <div className={`absolute top-[40px] left-0 h-fit w-full pb-2.5 px-2.5 bg-white shadow-md rounded-b-lg border-[1px] border-gray-200 ${isSearch ? '' : 'hidden'}`}>
                <SearchList />
            </div>
        </div>
    );
};

export default MobileSearchBar;
