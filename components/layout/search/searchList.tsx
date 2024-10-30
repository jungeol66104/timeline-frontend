import React from "react";
import {useSelector} from "react-redux";
import {selectSearchedTimelines} from "@/store/slices/searchSlice";
import SearchContent from "@/components/layout/search/searchContent";

const SearchList = () => {
    const searchedTimelines = useSelector(selectSearchedTimelines).slice(0, 10)

    return (
        <div className={'w-full h-fit px-2.5 pt-2.5'} style={{maxWidth: '480px'}}>
            {searchedTimelines.map((timeline, i) => {
                return <SearchContent searchResult={timeline} key={i}/>
            })}
        </div>
    )
}
export default SearchList