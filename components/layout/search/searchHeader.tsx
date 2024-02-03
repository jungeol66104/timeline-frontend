import React, {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectIsSearch, selectSearchValue, updateSearchedEvents, updateSearchedTimelines, updateSearchValue} from "@/store/slices/searchSlice";
import api from "@/utils/api";
import Image from "next/image";
import SearchInBarSVG from "@/public/svg/searchInBar.svg";
import SearchTab from "@/components/layout/search/searchTab";
import {useRouter} from "next/router";
import useDebounce from "@/hooks/useDebounce";
// refactoring: clear

const SearchHeader = () => {
    const searchBarInputRef: RefObject<HTMLInputElement> = useRef(null)

    const router = useRouter();
    const isHome = router.pathname === '/';
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)
    const searchValue = useSelector(selectSearchValue)
    const debouncedSearchValue = useDebounce(searchValue, 100)

    useEffect(() => {
        const query = debouncedSearchValue

        const fetchSearchResults = async (query: any) => {
            try {
                const eventResponse = await api.get(`/search/event?searchText=${query}`, {headers: {lang: 'en'}})
                const timelineResponse = await api.get(`/search/timeline?searchText=${query}`, {headers: {lang: 'en'}})
                const timelines = timelineResponse.data.data
                const events = eventResponse.data.data
                return { timelines, events }
            } catch (error) {
                console.error('Error fetching searched timelines and events: ', error);
                return { timelines: [], events: [] }
            }
        }

        const operateSearch = async () => {
            try {
                const { timelines, events } = await fetchSearchResults(query)
                dispatch(updateSearchedTimelines(timelines))
                dispatch(updateSearchedEvents(events))
            } catch (error) {
                console.error('Error updating timelines, events and query: ', error);
            }
        }

        operateSearch()
    }, [debouncedSearchValue]);


    // when search feature activates, focus to the searchbar in order to write query immediately
    useEffect(() => {
        const searchBarInput = searchBarInputRef.current
        if (!searchBarInput) return;
        if(isHome || isSearch)
            searchBarInput.focus()
    });

    return (
        <div>
            <div className={'h-[50px] flex gap-2.5 py-2.5 border-b-[1px]'}>
                <div className={'flex-shrink-0 w-7 h-7 bg-gray-500 rounded-full flex align-middle justify-center'}><Image src={SearchInBarSVG} alt={'searchInBar'} width={16} height={16} /></div>
                <input ref={searchBarInputRef} onChange={(e) => dispatch(updateSearchValue(e.target.value))} value={searchValue} placeholder={'Search...'} className={'w-full'} style={{outline: 'none'}}></input>
            </div>
            <SearchTab />
        </div>
    )
}

export default SearchHeader