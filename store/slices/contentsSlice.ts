import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";
// refactoring: clear

// values before any dispatch
const initialState = {
    // language: "en",
    currentTimeline: {id: 1, name: '', description: '', image: ''},
    currentTimelines: [],
    currentEvent: {id: 1, name: '', description: '', date: '', ephemerisTime: 0, importance: 0, depth: 0, timelineInfo: [], overlap: 0, isToggle: false, toggleEvents: []},
    currentEvents: [],
    currentEventsWithEffect: [],
    prevEventsWithEffect: [],
    currentSerieses: [],
    currentSeries: {}
} as initialContentsState

// part of the store as a whole, related with actual contents
const contentsSlice = createSlice({
    name: 'contents',
    initialState,
    reducers: {
        updateCurrentTimeline: (state, action) => {
            state.currentTimeline = action.payload
        },
        updateCurrentTimelines: (state, action) => {
            state.currentTimelines = action.payload
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
        updateCurrentSerieses: (state, action) => {
            state.currentSerieses = action.payload
        },
        updateCurrentSeries: (state, action) => {
            state.currentSeries = action.payload
        },
    },
});
export default contentsSlice.reducer;
export const {updateCurrentTimeline, updateCurrentTimelines, updateCurrentEvent, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect, updateIsToggle, updateToggleEvents, updateCurrentSerieses, updateCurrentSeries } = contentsSlice.actions;

// reduces repetition inside components when selecting the specific state
// selectors
export const selectCurrentTimeline = (state: RootState) => state.contents.currentTimeline
export const selectCurrentTimelines = (state: RootState) => state.contents.currentTimelines
export const selectCurrentEvent = (state: RootState) => state.contents.currentEvent
export const selectCurrentEvents = (state: RootState) => state.contents.currentEvents
export const selectCurrentEventsWithEffect = (state: RootState) => state.contents.currentEventsWithEffect
export const selectPrevEventsWithEffect = (state: RootState) => state.contents.prevEventsWithEffect
export const selectCurrentSerieses = (state: RootState) => state.contents.currentSerieses
export const selectCurrentSeries = (state: RootState) => state.contents.currentSeries

// types
export interface initialContentsState {
    // language: "en" | "kr"
    currentTimeline: {id: number, name: string, description: string, image: string}
    currentTimelines: any[]
    currentEvent: TimelineEvent,
    currentEvents: TimelineEvent[],
    currentEventsWithEffect: TimelineEvent[],
    prevEventsWithEffect: TimelineEvent[],
    currentSerieses: any[]
    currentSeries: any
}

export interface TimelineEvent {
    id: number
    date: string
    ephemerisTime: number | string
    name: string
    description: string
    timelines?: {id: number, name: string, description: string, image: string}[]
    overlap?: number
    depth?: number
    distance?: number
    animation?: string
    isToggle?: boolean
    toggleEvents?: any[]
    order?: number
    top?: number
    boxTop?: number
    fadeout?: boolean
    prev?: boolean
    blank?: boolean
    new?: boolean
    createdDT?: string
    updatedDT?: string
}

export interface Series {
    name: string
    description: string
    timelineList: SeriesTimeline[]
    timelines: SeriesTimeline[]
    hasMore: boolean
    totalCount: number
    totalPage: number
}

export interface SeriesTimeline {
    id: number
    name: string
    description: string
    image: string
}