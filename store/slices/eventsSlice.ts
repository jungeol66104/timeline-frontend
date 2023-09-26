import { createSlice } from '@reduxjs/toolkit';
import events, { Event }from '../../public/events'

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        currentDepth: 0,
        // use fetched result later, this state is temporary
        currentEvents: events.filter(event => {
            return event.depth === 0
        }),
        scrollTop: 0
    },
    reducers: {
        incrementDepth: state => {
            state.currentDepth += 1
        },
        decrementDepth: state => {
            state.currentDepth -= 1
        },
        updateEvents: (state, action) => {
            //update fetched events to currentEvents
        },
        updateScrollTop: (state, action) => {
            //update calculated scrollTop
        }
    },
});

export const { incrementDepth, decrementDepth, updateEvents, updateScrollTop} = eventsSlice.actions;
export default eventsSlice.reducer;
