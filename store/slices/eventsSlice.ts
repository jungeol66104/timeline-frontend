import { createSlice } from '@reduxjs/toolkit';
import {TimelineEvent} from "@/public/events";

interface initialState {
    currentEvents: TimelineEvent[],
    currentEventsWithEffect: TimelineEvent[],
    prevEventsWithEffect: TimelineEvent[],
    data: TimelineEvent[],
    // sub
    currentDepth: number,
    scrollTop: number,
    afterEffectTop: number,
    lastAction: string,
    totalHeight: number,
}

const initialState = {
    currentEvents: [],
    currentEventsWithEffect: [],
    prevEventsWithEffect: [],
    data: [],

    currentDepth: 0,
    scrollTop: 0,
    afterEffectTop: 0,
    lastAction: 'render',
    totalHeight: 0,
} as initialState

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        incrementDepth: state => {
            state.currentDepth += 1
        },
        decrementDepth: state => {
            state.currentDepth -= 1
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
        updateScrollTop: (state, action) => {
            state.scrollTop = action.payload
        },
        updateAfterEffectTop: (state, action) => {
            state.afterEffectTop = action.payload
        },
        updateLastAction: (state, action) => {
            state.lastAction = action.payload
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
        updateTotalHeight: (state, action) => {
            state.totalHeight = action.payload
        },
    },
});

export const { incrementDepth, decrementDepth, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect, updateScrollTop, updateAfterEffectTop, updateLastAction, updateData, updateIsToggle, updateToggleEvents, updateTotalHeight} = eventsSlice.actions;
export default eventsSlice.reducer;
