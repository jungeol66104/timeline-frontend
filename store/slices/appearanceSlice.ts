import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";
import {stat} from "fs";
// refactoring: clear

// values before any dispatch
const initialState = {
    aboveTimelineHeight: 70,
    eventBoxHeight: 124,
    overlapBottom: 6,
    maxDepth: 1,
    isTopEnd: true,
    isBottomEnd: true,
    lastAction: 'render',
    currentDepth: 0,
    scrollTop: 0,
    afterEffectTop: 0,
    totalHeight: 0,
    isTimelineInfo: false
} as initialAppearanceState

// part of the store as a whole, related with the app's appearance such as layout and effects
const appearanceSlice = createSlice({
    name: 'appearance',
    initialState,
    reducers: {
        updateIsTopEnd: (state, action) => {
            state.isTopEnd = action.payload
        },
        updateIsBottomEnd: (state, action) => {
            state.isBottomEnd = action.payload
        },
        incrementDepth: state => {
            state.currentDepth += 1
        },
        decrementDepth: state => {
            state.currentDepth -= 1
        },
        updateCurrentDepth: (state, action) => {
            state.currentDepth = action.payload
        },
        updateMaxDepth: (state, action) => {
            state.maxDepth = action.payload
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
        updateIsTimelineInfo: state => {
            state.isTimelineInfo = !state.isTimelineInfo
        }
    },
});
export default appearanceSlice.reducer;
export const {updateIsTopEnd, updateIsBottomEnd, incrementDepth, decrementDepth, updateCurrentDepth, updateMaxDepth, updateScrollTop, updateAfterEffectTop, updateLastAction, updateTotalHeight, updateIsTimelineInfo } = appearanceSlice.actions;

// reduces repetition inside components when selecting the specific state
// selectors
export const selectAboveTimelineHeight = (state: RootState) => state.appearance.aboveTimelineHeight
export const selectEventBoxHeight = (state: RootState) => state.appearance.eventBoxHeight
export const selectOverlapBottom = (state: RootState) => state.appearance.overlapBottom
export const selectIsTopEnd = (state: RootState) => state.appearance.isTopEnd
export const selectIsBottomEnd = (state: RootState) => state.appearance.isBottomEnd
export const selectCurrentDepth = (state: RootState) => state.appearance.currentDepth
export const selectMaxDepth = (state: RootState) => state.appearance.maxDepth
export const selectScrollTop = (state: RootState) => state.appearance.scrollTop
export const selectAfterEffectTop = (state: RootState) => state.appearance.afterEffectTop
export const selectLastAction = (state: RootState) => state.appearance.lastAction
export const selectTotalHeight = (state: RootState) => state.appearance.totalHeight
export const selectIsTimelineInfo = (state: RootState) => state.appearance.isTimelineInfo

// types
export interface initialAppearanceState {
    // fixed
    aboveTimelineHeight: number
    eventBoxHeight: number
    overlapBottom: number
    // timeline info
    maxDepth: number
    isTopEnd: boolean
    isBottomEnd: boolean
    // for effects
    lastAction: string
    currentDepth: number
    scrollTop: number
    afterEffectTop: number
    totalHeight: number
    isTimelineInfo: boolean
}
