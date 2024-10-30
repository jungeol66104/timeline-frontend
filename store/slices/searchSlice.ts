import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    isSearch: false,
    searchValue: '',
    searchedTimelines: [],
} as initialSearchState

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateIsSearch : (state, action) => {
            state.isSearch = action.payload
        },
        updateSearchValue : (state, action) => {
            state.searchValue = action.payload
        },
        updateSearchedTimelines : (state, action) => {
            state.searchedTimelines = action.payload
        },
    },
});
export default searchSlice.reducer;
export const { updateIsSearch, updateSearchValue, updateSearchedTimelines} = searchSlice.actions;

// selectors
export const selectIsSearch = (state: RootState) => state.search.isSearch
export const selectSearchValue = (state: RootState) => state.search.searchValue
export const selectSearchedTimelines = (state: RootState) => state.search.searchedTimelines

// types
export interface initialSearchState {
    isSearch: boolean
    searchValue: string
    searchedTimelines: any[]
}

