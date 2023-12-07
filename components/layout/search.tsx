import React from "react";
import SearchHeader from "@/components/layout/searchHeader";
import SearchBody from "@/components/layout/searchBody";
// refactoring: clear

const Search = () => {

    return (
        <div className={'fixed top-[60px] pt-2.5 left-0 w-screen bg-white'} style={{height: 'calc(100% - 60px)', zIndex: 5000}}>
            <SearchHeader />
            <SearchBody />
        </div>
    )
}
export default Search




