import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isSearch: false,
        searchValue: '',
        tab: 0,
    },
    reducers: {
        updateIsSearch : state => {
            state.isSearch = !state.isSearch
        },
        updateSearchValue : (state, action) => {
            state.searchValue = action.payload
        }
        ,
        updateTab : (state, action) => {
            state.tab = action.payload
        }
    },
});

export const { updateIsSearch, updateSearchValue, updateTab } = searchSlice.actions;
export default searchSlice.reducer;
