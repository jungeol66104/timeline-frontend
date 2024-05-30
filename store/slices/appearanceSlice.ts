import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

// values before any dispatch
const initialState = {
    isSummary: true,
    isBottomEnd: true,
    currentPage: 1,
    totalPage: 1,
    tagNum: 0,
    scrollTop: 0,
    isShare: false,
    isEdit: false,
    timelineModalType: 'none',
    is404: false
} as initialAppearanceState

// part of the store as a whole, related with the app's appearance such as timelineToolbar and effects
const appearanceSlice = createSlice({
    name: 'appearance',
    initialState,
    reducers: {
        updateIsSummary: (state, action) => {
            state.isSummary = action.payload
        },
        updateIsBottomEnd: (state, action) => {
            state.isBottomEnd = action.payload
        },
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        updateTotalPage: (state, action) => {
            state.totalPage = action.payload
        },
        updateTagNum: (state, action) => {
            state.tagNum = action.payload
        },
        updateScrollTop: (state, action) => {
            state.scrollTop = action.payload
        },
        updateIsShare: (state) => {
            state.isShare = !state.isShare
        },
        updateIsEdit: (state) => {
            state.isEdit = !state.isEdit
        },
        updateTimelineModalType: (state, action) => {
            state.timelineModalType = action.payload
        },
        updateIs404: (state, action) => {
            state.is404 = action.payload
        },
    },
});
export default appearanceSlice.reducer;
export const {updateIsSummary, updateTagNum, updateTotalPage , updateIs404, updateIsShare, updateIsEdit, updateTimelineModalType, updateIsBottomEnd, updateCurrentPage} = appearanceSlice.actions;

// selectors
export const selectIsSummary = (state: RootState) => state.appearance.isSummary
export const selectIsBottomEnd = (state: RootState) => state.appearance.isBottomEnd
export const selectCurrentPage = (state: RootState) => state.appearance.currentPage
export const selectTotalPage = (state: RootState) => state.appearance.totalPage
export const selectCurrentTagNum = (state: RootState) => state.appearance.tagNum
export const selectScrollTop = (state: RootState) => state.appearance.scrollTop
export const selectIsShare = (state: RootState) => state.appearance.isShare
export const selectIsEdit = (state: RootState) => state.appearance.isEdit
export const selectTimelineModalType = (state: RootState) => state.appearance.timelineModalType
export const selectIs404 = (state: RootState) => state.appearance.is404

// types
export interface initialAppearanceState {
    // info
    isBottomEnd: boolean
    tagNum: number
    isSummary: boolean
    currentPage: number
    totalPage: number
    // for effects
    scrollTop: number
    isShare: boolean
    isEdit: boolean
    timelineModalType: 'none' | 'information' | 'event'
    is404: boolean
}
