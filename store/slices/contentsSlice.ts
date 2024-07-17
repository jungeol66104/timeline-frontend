import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";

const initialState = {
    currentTimeline: {id: 1, name: '', description: '', image: '', content: null, imageSize: {width: 0, height: 0}},
    currentTimelineDraft: {id: 1, name: '', description: '', image: '', content: null, imageSize: {width: 0, height: 0}},
    currentTimelines: [],
    currentEvent: {id: 1, name: '', description: '', date: '', ephemerisTime: 0, importance: 0, depth: 0, timelineInfo: []},
    currentEventDraft: {id: 1, name: '', description: '', date: '', ephemerisTime: 0, importance: 0, depth: 0, timelineInfo: []},
    currentEvents: [],
    currentEventsDraft: [],
    relatedNews: [],
    relatedTimelines: [],
    recentTimelines: [],
    popularTimelines: [],
} as initialContentsState

const contentsSlice = createSlice({
    name: 'contents',
    initialState,
    reducers: {
        updateCurrentTimeline: (state, action) => {
            state.currentTimeline = action.payload
        },
        updateCurrentTimelineDraft: (state, action) => {
            state.currentTimelineDraft = action.payload
        },
        updateCurrentTimelines: (state, action) => {
            state.currentTimelines = action.payload
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
        updateCurrentEventsDraft: (state, action) => {
            state.currentEventsDraft = action.payload
        },
        updateRelatedNews: (state, action) => {
            state.relatedNews = action.payload
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
export const {updateCurrentEventsDraft, updateCurrentTimelineDraft, updateCurrentEventDraft, updateRelatedNews, updateCurrentTimelines, updatePopularTimelines ,updateRecentTimelines, updateRelatedTimelines , updateCurrentTimeline, updateCurrentEvent, updateCurrentEvents} = contentsSlice.actions;

// selectors
export const selectCurrentTimeline = (state: RootState) => state.contents.currentTimeline
export const selectCurrentTimelineDraft = (state: RootState) => state.contents.currentTimelineDraft
export const selectCurrentTimelines = (state: RootState) => state.contents.currentTimelines
export const selectCurrentEvent = (state: RootState) => state.contents.currentEvent
export const selectCurrentEventDraft = (state: RootState) => state.contents.currentEventDraft
export const selectCurrentEvents = (state: RootState) => state.contents.currentEvents
export const selectCurrentEventsDraft = (state: RootState) => state.contents.currentEventsDraft
export const selectRelatedNews = (state: RootState) => state.contents.relatedNews
export const selectRelatedTimelines = (state: RootState) => state.contents.relatedTimelines
export const selectPopularTimelines = (state: RootState) => state.contents.popularTimelines
export const selectRecentTimelines = (state: RootState) => state.contents.recentTimelines

// types
export interface initialContentsState {
    currentTimeline: Timeline
    currentTimelineDraft: Timeline
    currentTimelines: any[]
    currentEvent: TimelineEvent,
    currentEventDraft: TimelineEvent,
    currentEvents: TimelineEvent[],
    currentEventsDraft: TimelineEvent[],
    relatedNews: any[],
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
    imageSize: {width: number, height: number}
}

export interface TimelineEvent {
    id: number
    date: string
    ephemerisTime: number | string
    name: string
    description: string
    timelines?: {id: number, name: string, description: string, image: string}[]
    depth?: number
    order?: number
    top?: number
    prev?: boolean
    new?: boolean
    createdDT?: string
    updatedDT?: string
}
