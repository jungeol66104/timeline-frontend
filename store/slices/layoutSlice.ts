import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        title: "",
        showTitle: false
    },
    reducers: {
        updateTitle : (state, action) => {
            state.title = action.payload
        },
        updateShowTitle : (state, action) => {
            state.showTitle = action.payload
        },
    },
});

export const { updateTitle , updateShowTitle} = layoutSlice.actions;
export default layoutSlice.reducer;
