import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isSearch: false,
        searchValue: null,
    },
    reducers: {
        updateIsSearch : state => {
            state.isSearch = !state.isSearch
        },
    },
});

export const { updateIsSearch } = searchSlice.actions;
export default searchSlice.reducer;
