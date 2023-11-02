import { createSlice } from '@reduxjs/toolkit';

export interface initialLayoutState {
    title: string
    showTitle: boolean
}

const initialState = {
    title: "",
    showTitle: false
} as initialLayoutState

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
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
