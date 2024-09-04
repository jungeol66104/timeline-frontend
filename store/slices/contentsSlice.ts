import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    currentTimelines: [],
    currentTimeline: {id: 0, title: '', description: '', content: '', contributors: {counts: 0, userId: 0, username: '', imagePath: "", cdnUrl: ""}},
    currentEvents: [],
    currentEvent: {id: 0, title: '', content: '', date: '', contributors: {counts: 0, userId: 0, username: '', imagePath: "", cdnUrl: ""}},
    currentTimelineDraft: {id: 0, title: '', description: '', content: '', contributors: {counts: 0, userId: 0, username: '', imagePath: "", cdnUrl: ""}},
    currentEventDraft: {id: 0, title: '', content: '', date: '', contributors: {counts: 0, userId: 0, username: '', imagePath: "", cdnUrl: ""}},
    currentContributors: [],
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
        updateCurrentEvents: (state, action) => {
            state.currentEvents = action.payload
        },
        updateEventInCurrentEvents: (state, action) => {
            const eventIndex = state.currentEvents.findIndex(event => event.id === action.payload.id)
            if (eventIndex !== -1) state.currentEvents = [...state.currentEvents.slice(0, eventIndex), action.payload, ...state.currentEvents.slice(eventIndex + 1)];
        },
        updateCurrentEvent: (state, action) => {
            state.currentEvent = action.payload
        },
        updateCurrentTimelineDraft: (state, action) => {
            state.currentTimelineDraft = action.payload
        },
        updateCurrentEventDraft: (state, action) => {
            state.currentEventDraft = action.payload
        },
        updateCurrentContributors: (state, action) => {
            state.currentContributors = action.payload
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

export const {
    updateCurrentTimelines,
    updateCurrentTimeline,
    updateCurrentEvents,
    updateEventInCurrentEvents,
    updateCurrentEvent,
    updateCurrentTimelineDraft,
    updateCurrentEventDraft,
    updateCurrentContributors,
    updatePopularTimelines ,
    updateRecentTimelines,
    updateRelatedTimelines ,
} = contentsSlice.actions;

// selectors
export const selectCurrentTimelines = (state: RootState) => state.contents.currentTimelines
export const selectCurrentTimeline = (state: RootState) => state.contents.currentTimeline
export const selectCurrentEvents = (state: RootState) => state.contents.currentEvents
export const selectCurrentEvent = (state: RootState) => state.contents.currentEvent
export const selectCurrentTimelineDraft = (state: RootState) => state.contents.currentTimelineDraft
export const selectCurrentEventDraft = (state: RootState) => state.contents.currentEventDraft
export const selectCurrentContributors = (state: RootState) => state.contents.currentContributors
export const selectRelatedTimelines = (state: RootState) => state.contents.relatedTimelines
export const selectRecentTimelines = (state: RootState) => state.contents.recentTimelines
export const selectPopularTimelines = (state: RootState) => state.contents.popularTimelines

// types
export interface initialContentsState {
    currentTimelines: any[]
    currentTimeline: Timeline
    currentEvents: Event[],
    currentEvent: Event,
    currentTimelineDraft: Timeline
    currentEventDraft: Event,
    currentContributors: any[]
    relatedTimelines: any[],
    recentTimelines: any[],
    popularTimelines: any[],
}

export interface Timeline {
    id: number
    title: string
    description: string
    content: string
    imagePath?: string
    cdnUrl?: string
    imageSize?: {width: number, height: number}
    contributors?: Contributors
    createdDT?: string
    updatedDT?: string
}

export interface Event {
    id: number
    date: string
    title: string
    content: string
    imagePath?: string
    cdnUrl?: string
    imageSize?: {width: number, height: number}
    ephemerisTime?: number
    isKeynote?: number
    contributors?: any
    createdDT?: string
    updatedDT?: string
}

export interface Contributors {
    counts: number
    userId: number
    username: string
    imagePath: string
    cdnUrl: string
}