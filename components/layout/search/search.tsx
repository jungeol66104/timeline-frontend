import React from "react";
import SearchHeader from "@/components/layout/search/searchHeader";
import SearchBody from "@/components/layout/search/searchBody";
// refactoring: clear

const Search = () => {
    return (
        <div className={'search fixed top-[60px] max-w-lg pt-2.5 px-5 left-1/2 transform -translate-x-1/2 w-screen bg-white'} style={{height: 'calc(100% - 60px)', zIndex: 4999}}>
            <SearchHeader />
            <SearchBody />
        </div>
    )
}
export default Search



