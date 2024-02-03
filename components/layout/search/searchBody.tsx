import React from "react";
import SearchList from "@/components/layout/search/searchList";
// refactoring: clear

const SearchBody = () => {
    return (
        <div className={`flex w-full overflow-y-auto`} style={{height: `calc(100% - 93px)`}}>
            <SearchList/>
        </div>
    )
}
export default SearchBody