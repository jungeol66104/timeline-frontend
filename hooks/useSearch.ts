import api from "@/pages/api/api";
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectSearchValue, updateSearchedTimelines} from "@/store/slices/searchSlice";
import useDebounce from "@/hooks/useDebounce";

const useSearch = () => {
    const dispatch = useDispatch()
    const searchValue = useSelector(selectSearchValue)
    const debouncedSearchValue = useDebounce(searchValue, 100)

    useEffect(() => {
        const query = debouncedSearchValue

        const fetchSearchResults = async (query: any) => {
            try {
                const response = await api.get(`/search/timeline?searchText=${query}`, {headers: {lang: 'en'}})
                return response.data.data
            } catch (error) {console.error('Error fetching searched timelines and events: ', error);}
        }

        const operateSearch = async () => {
            try {
                const timelines = await fetchSearchResults(query)
                dispatch(updateSearchedTimelines(timelines))
            } catch (error) {console.error('Error updating timelines, events and query: ', error);}
        }

        operateSearch()
    }, [dispatch, debouncedSearchValue]);
}


export default useSearch