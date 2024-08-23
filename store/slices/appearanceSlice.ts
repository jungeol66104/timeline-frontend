import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    showTimelineTitleBar: false,
    isKeynote: true,
    isBottomEnd: true,
    currentPage: 1,
    totalPage: 1,
    tagNum: 0,
    scrollTop: 0,
    isShare: false,
    isPopup: false,
    isMaintenance: false,
    timelineType: 'public',
    modalType: 'none',
    informationContentType: 'view',
    informationHistoryType: 'list',
    eventContentType: 'view',
    eventHistoryType: 'list',
    demoKeyConcept: 'timeline',
    popupType: 'none'
} as initialAppearanceState

const appearanceSlice = createSlice({
    name: 'appearance',
    initialState,
    reducers: {
        updateShowTimelineTitleBar: (state, action) => {
            state.showTimelineTitleBar = action.payload
        },
        updateIsKeynote: (state, action) => {
            state.isKeynote = action.payload
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
        updateIsPopup: (state, action) => {
            state.isPopup = action.payload
        },
        updateTimelineType: (state, action) => {
            state.timelineType = action.payload
        },
        updateInformationContentType: (state, action) => {
            state.informationContentType = action.payload
        },
        updateInformationHistoryType: (state, action) => {
            state.informationHistoryType = action.payload
        },
        updateModalType: (state, action) => {
            state.modalType = action.payload
        },
        updateEventContentType: (state, action) => {
            state.eventContentType = action.payload
        },
        updateEventHistoryType: (state, action) => {
            state.eventHistoryType = action.payload
        },
        updateDemoKeyConcept: (state, action) => {
            state.demoKeyConcept = action.payload
        },
        updatePopupType: (state, action) => {
            state.popupType = action.payload
        },
        updateIsMaintenance: (state, action) => {
            state.isMaintenance = action.payload
        },
    },
});
export default appearanceSlice.reducer;
export const {updatePopupType, updateIsMaintenance, updateIsPopup, updateDemoKeyConcept, updateShowTimelineTitleBar, updateTimelineType, updateScrollTop, updateIsKeynote, updateTagNum, updateTotalPage , updateIsShare, updateInformationHistoryType, updateInformationContentType, updateModalType, updateEventContentType, updateEventHistoryType, updateIsBottomEnd, updateCurrentPage} = appearanceSlice.actions;

// selectors
export const selectShowTimelineTitleBar = (state: RootState) => state.appearance.showTimelineTitleBar
export const selectIsKeynote = (state: RootState) => state.appearance.isKeynote
export const selectIsBottomEnd = (state: RootState) => state.appearance.isBottomEnd
export const selectCurrentPage = (state: RootState) => state.appearance.currentPage
export const selectTotalPage = (state: RootState) => state.appearance.totalPage
export const selectCurrentTagNum = (state: RootState) => state.appearance.tagNum
export const selectScrollTop = (state: RootState) => state.appearance.scrollTop
export const selectIsShare = (state: RootState) => state.appearance.isShare
export const selectIsPopup = (state: RootState) => state.appearance.isPopup
export const selectIsMaintenance = (state: RootState) => state.appearance.isMaintenance
export const selectTimelineType = (state: RootState) => state.appearance.timelineType
export const selectModalType = (state: RootState) => state.appearance.modalType
export const selectInformationContentType = (state: RootState) => state.appearance.informationContentType
export const selectInformationHistoryType = (state: RootState) => state.appearance.informationHistoryType
export const selectEventContentType = (state: RootState) => state.appearance.eventContentType
export const selectEventHistoryType = (state: RootState) => state.appearance.eventHistoryType
export const selectDemoKeyConcept = (state: RootState) => state.appearance.demoKeyConcept
export const selectPopupType = (state: RootState) => state.appearance.popupType

// types
export interface initialAppearanceState {
    isKeynote: boolean // change expression to isKeynote
    isBottomEnd: boolean
    tagNum: number
    currentPage: number
    totalPage: number
    scrollTop: number
    isShare: boolean
    showTimelineTitleBar: boolean
    isMaintenance: boolean
    isPopup: boolean

    timelineType: 'public' | 'private' | 'new' | 'demo'
    modalType: 'none' | 'information' | 'event' | 'share'
    informationContentType: 'view' | 'edit' | 'history' | 'discussion' | 'new'
    informationHistoryType: 'list' | 'view' | 'diff'
    eventContentType: 'view' | 'edit'  | 'history' | 'discussion' | 'new'
    eventHistoryType: 'list' | 'view' | 'diff'

    demoKeyConcept: 'timeline' | 'information' | 'event' | 'edit' | 'contributors'  | 'keynote' | 'private'
    popupType: 'none' | 'share' | 'settings' | 'date' | 'publish' | 'create'
}
