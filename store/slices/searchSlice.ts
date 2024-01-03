import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";
// refactoring: clear

// values before any dispatch
const initialState = {
    isSearch: false,
    searchValue: '',
    tab: 'timeline',
    searchedTimelines: [{"id": 1, "name": "조 바이든"},{"id": 2, "name": "도널드 트럼프"},{"id": 3, "name": "시진핑"}],
    searchedEvents: []
} as initialSearchState

// part of the store as a whole, related with search feature
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateIsSearch : state => {
            state.isSearch = !state.isSearch
        },
        updateSearchValue : (state, action) => {
            state.searchValue = action.payload
        },
        updateTab : (state, action) => {
            state.tab = action.payload
        },
        updateSearchedTimelines : (state, action) => {
            state.searchedTimelines = action.payload
        },
        updateSearchedEvents : (state, action) => {
            state.searchedEvents = action.payload
        }
    },
});
export default searchSlice.reducer;
export const { updateIsSearch, updateSearchValue, updateTab, updateSearchedTimelines, updateSearchedEvents } = searchSlice.actions;

// reduces repetition inside components when selecting the specific state
// selectors
export const selectIsSearch = (state: RootState) => state.search.isSearch
export const selectSearchValue = (state: RootState) => state.search.searchValue
export const selectTab = (state: RootState) => state.search.tab
export const selectSearchedTimelines = (state: RootState) => state.search.searchedTimelines
export const selectSearchedEvents = (state: RootState) => state.search.searchedEvents

// types
export interface initialSearchState {
    isSearch: boolean
    searchValue: string
    tab: 'timeline' | 'event'
    searchedTimelines: any[]
    searchedEvents: any[]
}

