import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/store/rootReducer";
// refactoring: clear

const initialState = {
    title: "",
    showTitle: false,
    currentDepth: 0,
    scrollTop: 0,
    afterEffectTop: 0,
    lastAction: 'render',
    totalHeight: 0,
} as initialEffectsState

const effectsSlice = createSlice({
    name: 'effects',
    initialState,
    reducers: {
        updateTitle : (state, action) => {
            state.title = action.payload
        },
        updateShowTitle : (state, action) => {
            state.showTitle = action.payload
        },
        incrementDepth: state => {
            state.currentDepth += 1
        },
        decrementDepth: state => {
            state.currentDepth -= 1
        },
        updateCurrentDepth: (state, action) => {
            state.currentDepth = action.payload
        },
        updateScrollTop: (state, action) => {
            state.scrollTop = action.payload
        },
        updateAfterEffectTop: (state, action) => {
            state.afterEffectTop = action.payload
        },
        updateLastAction: (state, action) => {
            state.lastAction = action.payload
        },
        updateTotalHeight: (state, action) => {
            state.totalHeight = action.payload
        },
    },
});
export default effectsSlice.reducer;
export const { updateTitle , updateShowTitle, incrementDepth, decrementDepth, updateCurrentDepth, updateScrollTop, updateAfterEffectTop, updateLastAction, updateTotalHeight } = effectsSlice.actions;

// selectors
export const selectTitle = (state: RootState) => state.effects.title
export const selectShowTitle = (state: RootState) => state.effects.showTitle
export const selectCurrentDepth = (state: RootState) => state.effects.currentDepth
export const selectScrollTop = (state: RootState) => state.effects.scrollTop
export const selectAfterEffectTop = (state: RootState) => state.effects.afterEffectTop
export const selectLastAction = (state: RootState) => state.effects.lastAction
export const selectTotalHeight = (state: RootState) => state.effects.totalHeight

// types
export interface initialEffectsState {
    title: string
    showTitle: boolean
    currentDepth: number
    scrollTop: number
    afterEffectTop: number
    lastAction: string
    totalHeight: number
}
