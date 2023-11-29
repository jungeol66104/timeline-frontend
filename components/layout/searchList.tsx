import SearchContent from "@/components/layout/searchContent";
import React from "react";
import {useSelector} from "react-redux";
import {selectSearchedEvents, selectSearchedTimelines} from "@/store/slices/searchSlice";
// refactoring: clear

const SearchList = ({type}: {type: string}) => {

    const searchedTimelines = useSelector(selectSearchedTimelines)
    const searchedEvents = useSelector(selectSearchedEvents)
    let TimelinesOrEvents = type === 'timeline' ? searchedTimelines : searchedEvents

    return (
        <div className={'page'} style={{width: `calc(100vw - 32px)`, margin: '0 16px'}}>
            {TimelinesOrEvents.map((timelineOrEvent, i) => {
                return (
                    type === 'timeline'
                        ? <SearchContent timeline={timelineOrEvent} key={i}/>
                        : <SearchContent event={timelineOrEvent} key={i}/>
                )
            })}
        </div>
    )
}
export default SearchList