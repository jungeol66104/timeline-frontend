import { createSlice } from '@reduxjs/toolkit';
import events, { TimelineEvent }from '../../public/events'

const julianDateToEvent = (julianDate: number, events: TimelineEvent[]): TimelineEvent => {
    let julianDateEvents = events.filter(event => event.julianDate === julianDate)
    let overlap = julianDateEvents.length - 1
    if (overlap > 2) overlap = 2
    let lowestDepth = Math.min(...julianDateEvents.map(jEvent => jEvent.depth))
    return {...julianDateEvents.find(jEvent => jEvent.depth === lowestDepth), overlap: overlap} as TimelineEvent
}
const getInitialEvents = (events: TimelineEvent[])=> {
    let initialEvents = events.filter(event => event.depth === 0)
    let initialJulianDates = initialEvents.map(iEvent => iEvent.julianDate)
    initialEvents = initialJulianDates.map(jDate => julianDateToEvent(jDate, events))
    return initialEvents
}

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        currentDepth: 0,
        // use fetched result later, this state is temporary
        currentEvents: getInitialEvents(events),
        currentEventsWithEffect: getInitialEvents(events),
        prevEventsWithEffect: getInitialEvents(events),
        scrollTop: 0,
        afterEffectTop: 0,
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
        updateAfterEffectTop: (state, action) => {
            state.afterEffectTop = action.payload
        },
        updateLastAction: (state, action) => {
            state.lastAction = action.payload
        }
    },
});

export const { incrementDepth, decrementDepth, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect, updateScrollTop, updateAfterEffectTop, updateLastAction} = eventsSlice.actions;
export default eventsSlice.reducer;
