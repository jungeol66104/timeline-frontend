import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";
// refactoring: clear

const initialState = {
    isSearch: false,
    searchValue: '',
    tab: 0,
} as initialSearchState

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
        }
    },
});
export default searchSlice.reducer;
export const { updateIsSearch, updateSearchValue, updateTab } = searchSlice.actions;

// selectors
export const selectIsSearch = (state: RootState) => state.search.isSearch
export const selectSearchValue = (state: RootState) => state.search.searchValue
export const selectTab = (state: RootState) => state.search.tab

// types
export interface initialSearchState {
    isSearch: boolean
    searchValue: string
    tab: number
}