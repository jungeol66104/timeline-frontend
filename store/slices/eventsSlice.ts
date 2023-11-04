import { createSlice } from '@reduxjs/toolkit';
import {dummyEvent, TimelineEvent} from "@/public/events";
import {RootState} from "@/store/rootReducer";
// refactoring: clear

const initialState = {
    currentTimeline: {id: 0, name: ''},
    currentEvent: dummyEvent,
    currentEvents: [],
    currentEventsWithEffect: [],
    prevEventsWithEffect: [],
    data: [],
} as initialEventsState

const eventsSlice = createSlice({
    name: 'events',
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
        updateData: (state, action) => {
            state.data = action.payload
        },
        updateIsToggle: (state, action) => {
            state.currentEvents[action.payload].isToggle =  !state.currentEvents[action.payload].isToggle
        },
        updateToggleEvents: (state, action) => {
            state.currentEvents[action.payload.order].toggleEvents = action.payload.toggleEvents
        },
    },
});
export default eventsSlice.reducer;
export const { updateCurrentTimeline, updateCurrentEvent, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect, updateData, updateIsToggle, updateToggleEvents, } = eventsSlice.actions;

// selectors
export const selectCurrentTimeline = (state: RootState) => state.events.currentTimeline
export const selectCurrentEvent = (state: RootState) => state.events.currentEvent
export const selectCurrentEvents = (state: RootState) => state.events.currentEvents
export const selectCurrentEventsWithEffect = (state: RootState) => state.events.currentEventsWithEffect
export const selectPrevEventsWithEffect = (state: RootState) => state.events.prevEventsWithEffect
export const selectData = (state: RootState) => state.events.data

// types
export interface initialEventsState {
    currentTimeline: {id: number, name: string}
    currentEvent: TimelineEvent,
    currentEvents: TimelineEvent[],
    currentEventsWithEffect: TimelineEvent[],
    prevEventsWithEffect: TimelineEvent[],
    data: TimelineEvent[],
}