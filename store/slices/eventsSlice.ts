import { createSlice } from '@reduxjs/toolkit';
import {dummyEvents} from "@/public/events";

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        // use fetched result later, this state is temporary
        currentEvents: dummyEvents,
        currentEventsWithEffect: dummyEvents,
        prevEventsWithEffect: dummyEvents,
        data: [],

        // sub
        currentDepth: 0,
        scrollTop: 0,
        afterEffectTop: 0,
        lastAction: 'render',
        totalHeight: 0
    },
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
            state.currentEvents[action.payload.order].ToggleEvents = action.payload.toggleEvents
        },
        updateTotalHeight: (state, action) => {
            state.totalHeight = action.payload
        }
    },
});

export const { incrementDepth, decrementDepth, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect, updateScrollTop, updateAfterEffectTop, updateLastAction, updateData, updateIsToggle, updateToggleEvents, updateTotalHeight} = eventsSlice.actions;
export default eventsSlice.reducer;
