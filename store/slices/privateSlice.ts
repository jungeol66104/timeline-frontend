import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    session: {nickName: 'Nickname'}
} as initialPrivateState

const privateSlice = createSlice({
    name: 'private',
    initialState,
    reducers: {
        updateSession: (state, action) => {
            state.session = action.payload
        },
    },
});
export default privateSlice.reducer;
export const {updateSession} = privateSlice.actions;

// selectors
export const selectSession = (state: RootState) => state.private.session
export const selectIsSession = (state: RootState) => Object.keys(state.private.session).length !== 0

// types
export interface initialPrivateState {
    session: any
}

