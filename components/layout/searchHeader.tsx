import React, {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectIsSearch, selectSearchValue, updateSearchedEvents, updateSearchedTimelines, updateSearchValue} from "@/store/slices/searchSlice";
import api from "@/utils/api";
import Image from "next/image";
import SearchInBarSVG from "@/public/svg/searchInBar.svg";
import SearchTab from "@/components/layout/searchTab";
import {useRouter} from "next/router";
// refactoring: clear

const SearchHeader = () => {
    const searchBarInputRef: RefObject<HTMLInputElement> = useRef(null)

    const router = useRouter();
    const isHome = router.pathname === '/';
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)
    const searchValue = useSelector(selectSearchValue)

    const handelSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        dispatch(updateSearchValue(query))

        const fetchSearchResults = async (query: any) => {
            // initial timelines and events must be fetched
            if (query === '') {
                const initialTimelines = [{"id": 1, "name": "조 바이든"},{"id": 2, "name": "도널드 트럼프"},{"id": 3, "name": "시진핑"}]
                return { timelines: initialTimelines, events: [] }
            }
            try {
                const timelineResponse = await api.post('/v1/search', {"searchType": "timeline", "text": query})
                const eventResponse = await api.post('/v1/search', {"searchType": "event", "text": query})
                const timelines = timelineResponse.data.data.searchResult
                const events = eventResponse.data.data.searchResult
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
        await operateSearch()
    }

    // when search feature activates, focus to the searchbar in order to write query immediately
    useEffect(() => {
        const searchBarInput = searchBarInputRef.current
        if (!searchBarInput) return;
        if(isHome || isSearch)
            searchBarInput.focus()
    });

    return (
        <div>
            <div className={'h-[50px] flex gap-2.5 ml-4 mr-4 pt-2.5 pb-2.5 border-b-[1px]'}>
                <div className={'flex-shrink-0 w-7 h-7 bg-gray-500 rounded-full flex align-middle justify-center'}><Image src={SearchInBarSVG} alt={'searchInBar'} width={16} height={16} /></div>
                <input ref={searchBarInputRef} onChange={handelSearch} value={searchValue} placeholder={'Search...'} className={'w-full'} style={{outline: 'none'}}></input>
            </div>
            <SearchTab />
        </div>
    )
}

export default SearchHeader