import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        currentDepth: 0,
        currentEvents: [],
        scrollTop: 0
    },
    reducers: {
    },
});

export const { } = eventsSlice.actions;
export default eventsSlice.reducer;
