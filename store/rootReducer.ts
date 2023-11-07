import {AnyAction, CombinedState, combineReducers, Reducer} from 'redux';
import {HYDRATE} from "next-redux-wrapper";
import contentsSlice, {initialContentsState} from "@/store/slices/contentsSlice";
import appearanceSlice, {initialAppearanceState} from "@/store/slices/appearanceSlice";
import searchSlice, {initialSearchState} from "@/store/slices/searchSlice";
// refactoring: clear

const rootReducer: Reducer = (state: initialState, action: AnyAction): CombinedState<initialState> => {
    switch (action.type) {
        case HYDRATE:
            return action.payload
        default:
            return combineReducers({
                appearance: appearanceSlice,
                contents: contentsSlice,
                search: searchSlice
            })(state, action)
    }
}
export default rootReducer;

// types
export interface initialState {
    appearance: initialAppearanceState
    contents: initialContentsState
    search: initialSearchState
}
export type RootState = initialState
