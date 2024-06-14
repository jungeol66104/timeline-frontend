import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    session: {}
} as initialPersonalState

const personalSlice = createSlice({
    name: 'personal',
    initialState,
    reducers: {
        updateSession: (state, action) => {
            state.session = action.payload
        },
    },
});
export default personalSlice.reducer;
export const {updateSession} = personalSlice.actions;

// selectors
export const selectSession = (state: RootState) => state.personal.session
export const selectIsSession = (state: RootState) => Object.keys(state.personal.session).length !== 0

// types
export interface initialPersonalState {
    session: any
}

