import {useSelector} from "react-redux";
import {selectTab} from "@/store/slices/searchSlice";
import React from "react";
import SearchList from "@/components/layout/searchList";
// refactoring: clear

const SearchBody = () => {
    const tab = useSelector(selectTab)

    return (
        <div className={`flex w-fit transform transition-transform ease-in-out duration-300 ${tab === 'timeline' ? 'translate-x-0' : '-translate-x-1/2'}`}>
            <SearchList type={"timeline"}/>
            <SearchList type={"event"}/>
        </div>
    )
}
export default SearchBody