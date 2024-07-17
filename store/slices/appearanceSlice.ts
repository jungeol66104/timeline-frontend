import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    isSummary: true,
    isBottomEnd: true,
    currentPage: 1,
    totalPage: 1,
    tagNum: 0,
    scrollTop: 0,
    isShare: false,
    isEdit: false,
    isTimelineEdit: false,
    timelineContentType: 'view',
    timelineHistoryType: 'list',
    modalType: 'none',
    modalContentType: 'view',
    modalHistoryType: 'list',
    is404: false
} as initialAppearanceState

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
        updateIsEdit: (state, action) => {
            state.isEdit = action.payload
        },
        updateIsTimelineEdit: (state, action) => {
            state.isTimelineEdit = action.payload
        },
        updateTimelineContentType: (state, action) => {
            state.timelineContentType = action.payload
        },
        updateTimelineHistoryType: (state, action) => {
            state.timelineHistoryType = action.payload
        },
        updateModalType: (state, action) => {
            state.modalType = action.payload
        },
        updateModalContentType: (state, action) => {
            state.modalContentType = action.payload
        },
        updateModalHistoryType: (state, action) => {
            state.modalHistoryType = action.payload
        },
        updateIs404: (state, action) => {
            state.is404 = action.payload
        },
    },
});
export default appearanceSlice.reducer;
export const {updateScrollTop, updateIsSummary, updateTagNum, updateTotalPage , updateIs404, updateIsShare, updateIsEdit, updateIsTimelineEdit, updateTimelineHistoryType, updateTimelineContentType, updateModalType, updateModalContentType, updateModalHistoryType, updateIsBottomEnd, updateCurrentPage} = appearanceSlice.actions;

// selectors
export const selectIsSummary = (state: RootState) => state.appearance.isSummary
export const selectIsBottomEnd = (state: RootState) => state.appearance.isBottomEnd
export const selectCurrentPage = (state: RootState) => state.appearance.currentPage
export const selectTotalPage = (state: RootState) => state.appearance.totalPage
export const selectCurrentTagNum = (state: RootState) => state.appearance.tagNum
export const selectScrollTop = (state: RootState) => state.appearance.scrollTop
export const selectIsShare = (state: RootState) => state.appearance.isShare
export const selectIsEdit = (state: RootState) => state.appearance.isEdit
export const selectIsTimelineEdit = (state: RootState) => state.appearance.isTimelineEdit
export const selectTimelineContentType = (state: RootState) => state.appearance.timelineContentType
export const selectTimelineHistoryType = (state: RootState) => state.appearance.timelineHistoryType
export const selectModalType = (state: RootState) => state.appearance.modalType
export const selectModalContentType = (state: RootState) => state.appearance.modalContentType
export const selectModalHistoryType = (state: RootState) => state.appearance.modalHistoryType
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
    isTimelineEdit: boolean
    timelineContentType: 'view' | 'history' | 'edit'
    timelineHistoryType: 'list' | 'view' | 'diff'
    modalType: 'none' | 'share' | 'information' | 'event'
    modalContentType: 'view' | 'history' | 'edit'
    modalHistoryType: 'list' | 'view' | 'diff'
    is404: boolean
}
