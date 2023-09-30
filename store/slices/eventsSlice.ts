import { createSlice } from '@reduxjs/toolkit';
import events, { TimelineEvent }from '../../public/events'

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        currentDepth: 0,
        // use fetched result later, this state is temporary
        currentEvents: events.filter(event => {
            return event.depth === 0
        }),
        currentEventsWithEffect: events.filter(event => {
            return event.depth === 0
        }),
        prevEventsWithEffect: events.filter(event => {
            return event.depth === 0
        }),
        scrollTop: 0,
        lastAction: 'render'
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
        updateLastAction: (state, action) => {
            state.lastAction = action.payload
        }
    },
});

export const { incrementDepth, decrementDepth, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect, updateScrollTop, updateLastAction} = eventsSlice.actions;
export default eventsSlice.reducer;
