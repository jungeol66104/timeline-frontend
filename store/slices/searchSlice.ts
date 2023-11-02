import { createSlice } from '@reduxjs/toolkit';

export interface initialSearchState {
    isSearch: boolean
    searchValue: string
    tab: number
}

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

export const { updateIsSearch, updateSearchValue, updateTab } = searchSlice.actions;
export default searchSlice.reducer;
