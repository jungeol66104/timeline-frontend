import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    currentTimelines: [],
    currentTimeline: {id: 1, name: '', description: '', image: '', content: '', imageSize: {width: 0, height: 0}},
    currentEvents: [],
    currentEvent: {id: 1, name: '', description: '', date: '', ephemerisTime: 0, keynote: 0, timelineInfo: []},
    currentTimelineDraft: {id: 1, name: '', description: '', image: '', content: '', imageSize: {width: 0, height: 0}},
    currentEventDraft: {id: 1, name: '', description: '', date: '', ephemerisTime: 0, keynote: 0, timelineInfo: []},
    relatedTimelines: [],
    recentTimelines: [],
    popularTimelines: [],
} as initialContentsState

const contentsSlice = createSlice({
    name: 'contents',
    initialState,
    reducers: {
        updateCurrentTimelines: (state, action) => {
            state.currentTimelines = action.payload
        },
        updateCurrentTimeline: (state, action) => {
            state.currentTimeline = action.payload
        },
        updateCurrentTimelineDraft: (state, action) => {
            state.currentTimelineDraft = action.payload
        },
        updateCurrentEvent: (state, action) => {
            state.currentEvent = action.payload
        },
        updateCurrentEventDraft: (state, action) => {
            state.currentEventDraft = action.payload
        },
        updateCurrentEvents: (state, action) => {
            state.currentEvents = action.payload
        },
        updateEventInCurrentEvents: (state, action) => {
            const eventIndex = state.currentEvents.findIndex(event => event.id === action.payload.id)
            if (eventIndex !== -1) state.currentEvents = [...state.currentEvents.slice(0, eventIndex), action.payload, ...state.currentEvents.slice(eventIndex + 1)];
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
    },
});
export default contentsSlice.reducer;
export const {updateEventInCurrentEvents, updateCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimelines, updatePopularTimelines ,updateRecentTimelines, updateRelatedTimelines , updateCurrentTimeline, updateCurrentEvent, updateCurrentEvents} = contentsSlice.actions;

// selectors
export const selectCurrentTimelines = (state: RootState) => state.contents.currentTimelines
export const selectCurrentTimeline = (state: RootState) => state.contents.currentTimeline
export const selectCurrentTimelineDraft = (state: RootState) => state.contents.currentTimelineDraft
export const selectCurrentEvents = (state: RootState) => state.contents.currentEvents
export const selectCurrentEvent = (state: RootState) => state.contents.currentEvent
export const selectCurrentEventDraft = (state: RootState) => state.contents.currentEventDraft
export const selectRelatedTimelines = (state: RootState) => state.contents.relatedTimelines
export const selectPopularTimelines = (state: RootState) => state.contents.popularTimelines
export const selectRecentTimelines = (state: RootState) => state.contents.recentTimelines

// types
export interface initialContentsState {
    currentTimelines: any[]
    currentTimeline: Timeline
    currentEvents: TimelineEvent[],
    currentEvent: TimelineEvent,
    currentTimelineDraft: Timeline
    currentEventDraft: TimelineEvent,
    relatedTimelines: any[],
    recentTimelines: any[],
    popularTimelines: any[],
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
    image?: string
    imageSize?: {width: number, height: number}
    keynote?: number
    timelines?: {id: number, name: string, description: string, image: string}[]
    order?: number
    top?: number
    new?: boolean
    createdDT?: string
    updatedDT?: string
}
