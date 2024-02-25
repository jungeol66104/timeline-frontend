import SearchContent from "@/components/layout/search/searchContent";
import React from "react";
import {useSelector} from "react-redux";
import {selectSearchedEvents, selectSearchedTimelines, selectTab} from "@/store/slices/searchSlice";
// refactoring: clear

const SearchList = () => {
    const tab = useSelector(selectTab)
    const searchedTimelines = useSelector(selectSearchedTimelines).slice(0, 10)
    const searchedEvents = useSelector(selectSearchedEvents)
    const searchResults = tab === 'timeline' ? searchedTimelines : searchedEvents

    return (
        <div className={'w-full h-fit px-2.5 py-[6px]'} style={{maxWidth: '480px'}}>
            {searchResults.map((searchResult, i) => {
                return <SearchContent searchResult={searchResult} key={i}/>
            })}
        </div>
    )
}
export default SearchList