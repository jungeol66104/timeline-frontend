import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    scrollTop: 0,
    currentPage: 1,
    totalPage: 1,
    isBottomEnd: true,
    tagNum: 0,
    isKeynote: true,
    showTimelineTitleBar: false,
    isMaintenance: false,
    timelineType: 'public',
    modalType: 'none',
    informationContentType: 'view',
    informationHistoryType: 'list',
    eventContentType: 'view',
    eventHistoryType: 'list',
    demoKeyConcept: 'timeline',
    popupType: 'none',
    popupHistory: ['none'],
    errorType: 'none'
} as initialAppearanceState

const appearanceSlice = createSlice({
    name: 'appearance',
    initialState,
    reducers: {
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        updateTotalPage: (state, action) => {
            state.totalPage = action.payload
        },
        updateScrollTop: (state, action) => {
            state.scrollTop = action.payload
        },
        updateIsBottomEnd: (state, action) => {
            state.isBottomEnd = action.payload
        },
        updateTagNum: (state, action) => {
            state.tagNum = action.payload
        },
        updateIsKeynote: (state, action) => {
            state.isKeynote = action.payload
        },
        updateShowTimelineTitleBar: (state, action) => {
            state.showTimelineTitleBar = action.payload
        },
        updateIsMaintenance: (state, action) => {
            state.isMaintenance = action.payload
        },
        updateTimelineType: (state, action) => {
            state.timelineType = action.payload
        },
        updateModalType: (state, action) => {
            state.modalType = action.payload
        },
        updateInformationContentType: (state, action) => {
            state.informationContentType = action.payload
        },
        updateInformationHistoryType: (state, action) => {
            state.informationHistoryType = action.payload
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
            const newHistory = state.popupHistory
            newHistory.unshift(action.payload);
            state.popupHistory = newHistory.slice(0, 10);
        },
        updateErrorType: (state, action) => {
            state.errorType = action.payload
        },

    },
});
export default appearanceSlice.reducer;
export const {
    updateCurrentPage,
    updateTotalPage ,
    updateScrollTop,
    updateIsBottomEnd,
    updateTagNum,
    updateIsKeynote,
    updateShowTimelineTitleBar,
    updateIsMaintenance,
    updateTimelineType,
    updateModalType,
    updateInformationContentType,
    updateInformationHistoryType,
    updateEventContentType,
    updateEventHistoryType,
    updateDemoKeyConcept,
    updatePopupType,
    updateErrorType,
} = appearanceSlice.actions;

// selectors
export const selectCurrentPage = (state: RootState) => state.appearance.currentPage
export const selectTotalPage = (state: RootState) => state.appearance.totalPage
export const selectIsBottomEnd = (state: RootState) => state.appearance.isBottomEnd
export const selectScrollTop = (state: RootState) => state.appearance.scrollTop
export const selectTagNum = (state: RootState) => state.appearance.tagNum
export const selectIsKeynote = (state: RootState) => state.appearance.isKeynote
export const selectShowTimelineTitleBar = (state: RootState) => state.appearance.showTimelineTitleBar
export const selectIsMaintenance = (state: RootState) => state.appearance.isMaintenance
export const selectTimelineType = (state: RootState) => state.appearance.timelineType
export const selectModalType = (state: RootState) => state.appearance.modalType
export const selectInformationContentType = (state: RootState) => state.appearance.informationContentType
export const selectInformationHistoryType = (state: RootState) => state.appearance.informationHistoryType
export const selectEventContentType = (state: RootState) => state.appearance.eventContentType
export const selectEventHistoryType = (state: RootState) => state.appearance.eventHistoryType
export const selectDemoKeyConcept = (state: RootState) => state.appearance.demoKeyConcept
export const selectPopupType = (state: RootState) => state.appearance.popupType
export const selectPopupHistory = (state: RootState) => state.appearance.popupHistory
export const selectErrorType = (state: RootState) => state.appearance.errorType

// types
export interface initialAppearanceState {
    scrollTop: number
    currentPage: number
    totalPage: number
    isBottomEnd: boolean
    tagNum: number
    isKeynote: boolean
    showTimelineTitleBar: boolean
    isMaintenance: boolean

    timelineType: 'public' | 'private' | 'new' | 'demo'
    modalType: 'none' | 'information' | 'event' | 'share'
    informationContentType: 'view' | 'edit' | 'history' | 'discussion' | 'new'
    informationHistoryType: 'list' | 'view' | 'diff'
    eventContentType: 'view' | 'edit'  | 'history' | 'discussion' | 'new'
    eventHistoryType: 'list' | 'view' | 'diff'

    demoKeyConcept: 'timeline' | 'information' | 'event' | 'edit' | 'contributors'  | 'keynote' | 'private'
    popupType: popupType
    popupHistory: popupType[]
    errorType: 'none' |'date'
}

type popupType = 'none' | 'share' | 'settings' | 'dateGuide' | 'publish' | 'create' | 'signIn' | 'dateError' | 'deleteAccount' | 'detachEvent' | 'titleError'