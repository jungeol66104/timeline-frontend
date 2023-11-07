import { createSlice } from '@reduxjs/toolkit';
import {TimelineEvent} from "@/public/events";
import {RootState} from "@/store/rootReducer";
// refactoring: clear

const initialState = {
    currentTimeline: {id: 1, name: '타임라인_1'},
    currentEvent: {id: 1, name: '', description: '', date: '', julianDate: 0, importance: 0, depth: 0, timelineInfo: [], overlap: 0, isToggle: false, toggleEvents: []},
    currentEvents: [],
    currentEventsWithEffect: [],
    prevEventsWithEffect: [],
} as initialContentsState

const contentsSlice = createSlice({
    name: 'contents',
    initialState,
    reducers: {
        updateCurrentTimeline: (state, action) => {
            state.currentTimeline = action.payload
        },
        updateCurrentEvent: (state, action) => {
            state.currentEvent = action.payload
        },
        updateCurrentEvents: (state, action) => {
            state.currentEvents = action.payload
        },
        updateCurrentEventsWithEffect: (state, action) => {
            state.currentEventsWithEffect = action.payload
        },
        updatePrevEventsWithEffect: (state, action) => {
            state.prevEventsWithEffect = action.payload
        },
        updateIsToggle: (state, action) => {
            state.currentEvents[action.payload].isToggle =  !state.currentEvents[action.payload].isToggle
        },
        updateToggleEvents: (state, action) => {
            state.currentEvents[action.payload.order].toggleEvents = action.payload.toggleEvents
        },
    },
});
export default contentsSlice.reducer;
export const { updateCurrentTimeline, updateCurrentEvent, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect, updateIsToggle, updateToggleEvents, } = contentsSlice.actions;

// selectors
export const selectCurrentTimeline = (state: RootState) => state.contents.currentTimeline
export const selectCurrentEvent = (state: RootState) => state.contents.currentEvent
export const selectCurrentEvents = (state: RootState) => state.contents.currentEvents
export const selectCurrentEventsWithEffect = (state: RootState) => state.contents.currentEventsWithEffect
export const selectPrevEventsWithEffect = (state: RootState) => state.contents.prevEventsWithEffect

// types
export interface initialContentsState {
    currentTimeline: {id: number, name: string}
    currentEvent: TimelineEvent,
    currentEvents: TimelineEvent[],
    currentEventsWithEffect: TimelineEvent[],
    prevEventsWithEffect: TimelineEvent[],
}
