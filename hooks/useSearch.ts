import { useEffect } from 'react';
import api from "@/utils/api";
import {selectSearchValue, updateSearchedEvents, updateSearchedTimelines} from "@/store/slices/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import useDebounce from "@/hooks/useDebounce";

const useSearch = () => {
    const dispatch = useDispatch()
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
                let { timelines, events } = await fetchSearchResults(query)
                dispatch(updateSearchedTimelines(timelines))
                dispatch(updateSearchedEvents(events))
            } catch (error) {
                console.error('Error updating timelines, events and query: ', error);
            }
        }

        operateSearch()
    }, [dispatch, debouncedSearchValue]);
}


export default useSearch