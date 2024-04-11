import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

// values before any dispatch
const initialState = {
    currentTimeline: {id: 1, name: '', description: '', image: '', content: null},
    currentTimelines: [],
    relatedTimelines: [],
    recentTimelines: [],
    popularTimelines: [],
    currentEvent: {id: 1, name: '', description: '', date: '', ephemerisTime: 0, importance: 0, depth: 0, timelineInfo: [], overlap: 0, isToggle: false, toggleEvents: []},
    currentEvents: [],
    previousEvents: [],
    currentSerieses: [],
    currentSeries: {},
    pivotEvent: {id: 1, name: '', description: '', date: '', ephemerisTime: 0, importance: 0, depth: 0, timelineInfo: [], overlap: 0, isToggle: false, toggleEvents: []},
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
        updateRelatedTimelines: (state, action) => {
            state.relatedTimelines = action.payload
        },
        updateRecentTimelines: (state, action) => {
            state.recentTimelines = action.payload
        },
        updatePopularTimelines: (state, action) => {
            state.popularTimelines = action.payload
        },
        updateCurrentEvent: (state, action) => {
            state.currentEvent = action.payload
        },
        updatePivotEvent: (state, action) => {
            state.pivotEvent = action.payload
        },
        updateCurrentEvents: (state, action) => {
            state.currentEvents = action.payload
        },
        updatePreviousEvents: (state, action) => {
            state.previousEvents = action.payload
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
export const {updatePopularTimelines ,updateRecentTimelines, updateRelatedTimelines ,updatePivotEvent, updateCurrentTimeline, updateCurrentEvent, updateCurrentEvents, updatePreviousEvents, updateCurrentSerieses, updateCurrentSeries } = contentsSlice.actions;

// reduces repetition inside components when selecting the specific state
// selectors
export const selectCurrentTimeline = (state: RootState) => state.contents.currentTimeline
export const selectRelatedTimelines = (state: RootState) => state.contents.relatedTimelines
export const selectPopularTimelines = (state: RootState) => state.contents.popularTimelines
export const selectRecentTimelines = (state: RootState) => state.contents.recentTimelines
export const selectCurrentEvent = (state: RootState) => state.contents.currentEvent
export const selectCurrentEvents = (state: RootState) => state.contents.currentEvents
export const selectCurrentSeries = (state: RootState) => state.contents.currentSeries
export const selectCurrentSerieses = (state: RootState) => state.contents.currentSerieses
export const selectPivotEvent = (state: RootState) => state.contents.pivotEvent

// types
export interface initialContentsState {
    currentTimeline: Timeline
    currentTimelines: any[]
    relatedTimelines: any[],
    recentTimelines: any[],
    popularTimelines: any[],
    currentEvent: TimelineEvent,
    currentEvents: TimelineEvent[],
    previousEvents: TimelineEvent[],
    currentSerieses: any[]
    currentSeries: any
    pivotEvent: TimelineEvent
}

export interface Timeline {
    id: number
    name: string
    description: string
    content: string | null
    image: string
    imageSize?: {width: number, height: number}
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
    order?: number
    top?: number
    prev?: boolean
    blank?: boolean
    new?: boolean
    createdDT?: string
    updatedDT?: string
}

export interface Series {
    id: number
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