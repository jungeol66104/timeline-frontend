import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";
// refactoring: clear

const initialState = {
    aboveTimelineHeight: 70,
    eventBoxHeight: 124,
    overlapBottom: 6,
    lastAction: 'render',
    currentDepth: 0,
    scrollTop: 0,
    afterEffectTop: 0,
    totalHeight: 0,
} as initialAppearanceState

const appearanceSlice = createSlice({
    name: 'appearance',
    initialState,
    reducers: {
        incrementDepth: state => {
            state.currentDepth += 1
        },
        decrementDepth: state => {
            state.currentDepth -= 1
        },
        updateCurrentDepth: (state, action) => {
            state.currentDepth = action.payload
        },
        updateScrollTop: (state, action) => {
            state.scrollTop = action.payload
        },
        updateAfterEffectTop: (state, action) => {
            state.afterEffectTop = action.payload
        },
        updateLastAction: (state, action) => {
            state.lastAction = action.payload
        },
        updateTotalHeight: (state, action) => {
            state.totalHeight = action.payload
        },
    },
});
export default appearanceSlice.reducer;
export const {incrementDepth, decrementDepth, updateCurrentDepth, updateScrollTop, updateAfterEffectTop, updateLastAction, updateTotalHeight } = appearanceSlice.actions;

// selectors
export const selectAboveTimelineHeight = (state: RootState) => state.appearance.aboveTimelineHeight
export const selectEventBoxHeight = (state: RootState) => state.appearance.eventBoxHeight
export const selectOverlapBottom = (state: RootState) => state.appearance.overlapBottom
export const selectCurrentDepth = (state: RootState) => state.appearance.currentDepth
export const selectScrollTop = (state: RootState) => state.appearance.scrollTop
export const selectAfterEffectTop = (state: RootState) => state.appearance.afterEffectTop
export const selectLastAction = (state: RootState) => state.appearance.lastAction
export const selectTotalHeight = (state: RootState) => state.appearance.totalHeight

// types
export interface initialAppearanceState {
    aboveTimelineHeight: number
    eventBoxHeight: number
    overlapBottom: number
    lastAction: string
    currentDepth: number
    scrollTop: number
    afterEffectTop: number
    totalHeight: number
}
