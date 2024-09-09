import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    session: {},
    profileType: 'contributions'
} as initialPrivateState

const privateSlice = createSlice({
    name: 'private',
    initialState,
    reducers: {
        updateSession: (state, action) => {
            state.session = action.payload
        },
        updateProfileType: (state, action) => {
            state.profileType = action.payload
        }
    },
});
export default privateSlice.reducer;
export const {
    updateProfileType,
    updateSession
} = privateSlice.actions;

// selectors
export const selectSession = (state: RootState) => state.private.session
export const selectIsSession = (state: RootState) => Object.keys(state.private.session).length !== 0
export const selectProfileType = (state: RootState) => state.private.profileType

// types
export interface initialPrivateState {
    session: any
    profileType: 'timelines' | 'contributions'
}

