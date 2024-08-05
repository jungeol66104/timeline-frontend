import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    showTimelineNameBar: false,
    isSummary: true,
    isBottomEnd: true,
    currentPage: 1,
    totalPage: 1,
    tagNum: 0,
    scrollTop: 0,
    isShare: false,
    isEdit: false,
    timelineType: 'public',
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
        updateShowTimelineNameBar: (state, action) => {
            state.showTimelineNameBar = action.payload
        },
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
        updateTimelineType: (state, action) => {
            state.timelineType = action.payload
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
export const {updateShowTimelineNameBar, updateTimelineType, updateScrollTop, updateIsSummary, updateTagNum, updateTotalPage , updateIs404, updateIsShare, updateIsEdit, updateTimelineHistoryType, updateTimelineContentType, updateModalType, updateModalContentType, updateModalHistoryType, updateIsBottomEnd, updateCurrentPage} = appearanceSlice.actions;

// selectors
export const selectShowTimelineNameBar = (state: RootState) => state.appearance.showTimelineNameBar
export const selectIsSummary = (state: RootState) => state.appearance.isSummary
export const selectIsBottomEnd = (state: RootState) => state.appearance.isBottomEnd
export const selectCurrentPage = (state: RootState) => state.appearance.currentPage
export const selectTotalPage = (state: RootState) => state.appearance.totalPage
export const selectCurrentTagNum = (state: RootState) => state.appearance.tagNum
export const selectScrollTop = (state: RootState) => state.appearance.scrollTop
export const selectIsShare = (state: RootState) => state.appearance.isShare
export const selectIsEdit = (state: RootState) => state.appearance.isEdit
export const selectTimelineType = (state: RootState) => state.appearance.timelineType
export const selectTimelineContentType = (state: RootState) => state.appearance.timelineContentType
export const selectTimelineHistoryType = (state: RootState) => state.appearance.timelineHistoryType
export const selectModalType = (state: RootState) => state.appearance.modalType
export const selectModalContentType = (state: RootState) => state.appearance.modalContentType
export const selectModalHistoryType = (state: RootState) => state.appearance.modalHistoryType
export const selectIs404 = (state: RootState) => state.appearance.is404

// types
export interface initialAppearanceState {
    showTimelineNameBar: boolean
    isSummary: boolean // change expression to isKeynote
    isBottomEnd: boolean
    tagNum: number
    currentPage: number
    totalPage: number
    scrollTop: number
    isShare: boolean
    isEdit: boolean // used in personal. alternate with local state
    is404: boolean

    timelineType: 'public' | 'private' | 'demo'
    timelineContentType: 'view' | 'history' | 'edit' | 'new'
    timelineHistoryType: 'list' | 'view' | 'diff'
    modalType: 'none' | 'share' | 'information' | 'event' | 'center'
    modalContentType: 'view' | 'history' | 'edit' | 'new'
    modalHistoryType: 'list' | 'view' | 'diff'

    demoKeyConcept: ''
}
