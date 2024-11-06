import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    currentTimelines: [],
    currentEvents: [],
    currentTimeline: {id: 0, title: '', description: '', content: '', contributors: {counts: 0, userId: 0, username: '', imagePath: "", cdnUrl: ""}},
    currentTimelineDraft: {id: 0, title: '', description: '', content: '', contributors: {counts: 0, userId: 0, username: '', imagePath: "", cdnUrl: ""}},
    currentTimelineView: {id: 0, title: '', description: '', content: '', contributors: {counts: 0, userId: 0, username: '', imagePath: "", cdnUrl: ""}},
    currentEvent: {id: 0, title: '', content: '', date: '', contributors: {counts: 0, userId: 0, username: '', imagePath: "", cdnUrl: ""}},
    currentEventDraft: {id: 0, title: '', content: '', date: '', contributors: {counts: 0, userId: 0, username: '', imagePath: "", cdnUrl: ""}},
    currentEventView: {id: 0, title: '', content: '', date: '', contributors: {counts: 0, userId: 0, username: '', imagePath: "", cdnUrl: ""}},
    currentContributors: [],
    currentPageContributions: [],
    currentModalContributions: [],
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
        updateCurrentEvents: (state, action) => {
            state.currentEvents = action.payload
        },
        updateEventInCurrentEvents: (state, action) => {
            const eventIndex = state.currentEvents.findIndex(event => event.id === action.payload.id)
            if (eventIndex !== -1) state.currentEvents = [...state.currentEvents.slice(0, eventIndex), action.payload, ...state.currentEvents.slice(eventIndex + 1)];
        },
        updateCurrentTimeline: (state, action) => {
            state.currentTimeline = action.payload
        },
        updateCurrentTimelineDraft: (state, action) => {
            state.currentTimelineDraft = action.payload
        },
        updateCurrentTimelineView: (state, action) => {
            state.currentTimelineView = action.payload
        },
        updateCurrentEvent: (state, action) => {
            state.currentEvent = action.payload
        },
        updateCurrentEventDraft: (state, action) => {
            state.currentEventDraft = action.payload
        },
        updateCurrentEventView: (state, action) => {
            state.currentEventView = action.payload
        },
        updateCurrentContributors: (state, action) => {
            state.currentContributors = action.payload
        },
        updateCurrentModalContributions: (state, action) => {
            state.currentModalContributions = action.payload
        },
        updateCurrentPageContributions: (state, action) => {
            state.currentPageContributions = action.payload
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
    updateCurrentEvents,
    updateEventInCurrentEvents,
    updateCurrentTimeline,
    updateCurrentTimelineDraft,
    updateCurrentTimelineView,
    updateCurrentEvent,
    updateCurrentEventDraft,
    updateCurrentEventView,
    updateCurrentContributors,
    updateCurrentPageContributions,
    updateCurrentModalContributions,
    updatePopularTimelines ,
    updateRecentTimelines,
    updateRelatedTimelines ,
} = contentsSlice.actions;

// selectors
export const selectCurrentTimelines = (state: RootState) => state.contents.currentTimelines
export const selectCurrentEvents = (state: RootState) => state.contents.currentEvents
export const selectCurrentTimeline = (state: RootState) => state.contents.currentTimeline
export const selectCurrentTimelineDraft = (state: RootState) => state.contents.currentTimelineDraft
export const selectCurrentTimelineView = (state: RootState) => state.contents.currentTimelineView
export const selectCurrentEvent = (state: RootState) => state.contents.currentEvent
export const selectCurrentEventDraft = (state: RootState) => state.contents.currentEventDraft
export const selectCurrentEventView = (state: RootState) => state.contents.currentEventView
export const selectCurrentContributors = (state: RootState) => state.contents.currentContributors
export const selectCurrentPageContributions = (state: RootState) => state.contents.currentPageContributions
export const selectCurrentModalContributions = (state: RootState) => state.contents.currentModalContributions
export const selectRelatedTimelines = (state: RootState) => state.contents.relatedTimelines
export const selectRecentTimelines = (state: RootState) => state.contents.recentTimelines
export const selectPopularTimelines = (state: RootState) => state.contents.popularTimelines

// types
export interface initialContentsState {
    currentTimelines: any[]
    currentEvents: Event[],
    currentTimeline: Timeline
    currentTimelineDraft: Timeline
    currentTimelineView: Timeline
    currentEvent: Event,
    currentEventDraft: Event,
    currentEventView: Event,
    currentContributors: any[]
    currentPageContributions: any[]
    currentModalContributions: any[]
    relatedTimelines: any[]
    recentTimelines: any[]
    popularTimelines: any[]
}

export interface Timeline {
    id: number
    title: string
    description: string
    content: string
    timelinePath?: string
    cdnUrl?: string
    imagePath?: string
    imageSize?: {width: number, height: number}
    contributors?: Contributors
    revisionNo?: number
    createdDT?: string
    updatedDT?: string
    informationUpdatedDT?: string
    thumbnailLink?: string
}

export interface Event {
    id: number
    date: string
    title: string
    content: string
    cdnUrl?: string
    imagePath?: string
    imageSize?: {width: number, height: number}
    ephemerisTime?: number
    isKeynote?: number
    contributors?: any
    revisionNo?: number
    createdDT?: string
    updatedDT?: string
    thumbnailLink?: string
}

export interface Contributors {
    counts: number
    userId: number
    username: string
    imagePath: string
    cdnUrl: string
}