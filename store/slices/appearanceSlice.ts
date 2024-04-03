import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";
// refactoring: needed (separation logic maybe?)

// values before any dispatch
const initialState = {
    aboveTimelineHeight: 70,
    timelineEdgeHeight: 60,
    maxDepth: 1,
    currentDepth: 0,
    isTopEnd: true,
    isBottomEnd: true,
    currentPage: 1,
    lastAction: 'render',
    scrollTop: 0,
    previousTop: 0,
    totalHeight: 0,
    isTimelineInfo: true,
    isShare: false,
    is404: false
} as initialAppearanceState

// part of the store as a whole, related with the app's appearance such as timelineToolbar and effects
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
        updateCurrentDepth: (state, action) => {
            state.currentDepth = action.payload
        },
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        updateMaxDepth: (state, action) => {
            state.maxDepth = action.payload
        },
        updateScrollTop: (state, action) => {
            state.scrollTop = action.payload
        },
        updatePreviousTop: (state, action) => {
            state.previousTop = action.payload
        },
        updateLastAction: (state, action) => {
            state.lastAction = action.payload
        },
        updateIsTimelineInfo: state => {
            state.isTimelineInfo = !state.isTimelineInfo
        },
        updateIsShare: (state) => {
            state.isShare = !state.isShare
        },
        updateIs404: (state, action) => {
            state.is404 = action.payload
        },
    },
});
export default appearanceSlice.reducer;
export const {updateIs404, updateIsShare, updateIsTopEnd, updateIsBottomEnd, updateCurrentDepth, updateMaxDepth, updateCurrentPage, updatePreviousTop, updateLastAction} = appearanceSlice.actions;

// reduces repetition inside components when selecting the specific state
// selectors
export const selectAboveTimelineHeight = (state: RootState) => state.appearance.aboveTimelineHeight
export const selectTimelineEdgeHeight = (state: RootState) => state.appearance.timelineEdgeHeight
export const selectIsTopEnd = (state: RootState) => state.appearance.isTopEnd
export const selectIsBottomEnd = (state: RootState) => state.appearance.isBottomEnd
export const selectCurrentDepth = (state: RootState) => state.appearance.currentDepth
export const selectMaxDepth = (state: RootState) => state.appearance.maxDepth
export const selectCurrentPage = (state: RootState) => state.appearance.currentPage
export const selectScrollTop = (state: RootState) => state.appearance.scrollTop
export const selectPreviousTop = (state: RootState) => state.appearance.previousTop
export const selectLastAction = (state: RootState) => state.appearance.lastAction
export const selectIsShare = (state: RootState) => state.appearance.isShare
export const selectIs404 = (state: RootState) => state.appearance.is404

// types
export interface initialAppearanceState {
    // fixed
    aboveTimelineHeight: number
    timelineEdgeHeight: number
    // timeline info
    maxDepth: number
    currentDepth: number
    isTopEnd: boolean
    isBottomEnd: boolean
    currentPage: number
    // for effects
    scrollTop: number
    lastAction: string
    previousTop: number
    isTimelineInfo: boolean
    isShare: boolean
    is404: boolean
}
