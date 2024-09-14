import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    session: {},
    profile: {},
    profileDraft: {},
    profileType: 'contributions'
} as initialPrivateState

const privateSlice = createSlice({
    name: 'private',
    initialState,
    reducers: {
        updateSession: (state, action) => {
            state.session = action.payload
        },
        updateProfile: (state, action) => {
            state.profile = action.payload
        },
        updateProfileDraft: (state, action) => {
            state.profileDraft = action.payload
        },
        updateProfileType: (state, action) => {
            state.profileType = action.payload
        }
    },
});
export default privateSlice.reducer;
export const {
    updateSession,
    updateProfile,
    updateProfileDraft,
    updateProfileType,
} = privateSlice.actions;

// selectors
export const selectSession = (state: RootState) => state.private.session
export const selectIsSession = (state: RootState) => Object.keys(state.private.session).length !== 0
export const selectProfile = (state: RootState) => state.private.profile
export const selectProfileDraft = (state: RootState) => state.private.profileDraft
export const selectProfileType = (state: RootState) => state.private.profileType

// types
export interface initialPrivateState {
    session: any
    profile: any
    profileDraft: any
    profileType: 'timelines' | 'contributions'
}

