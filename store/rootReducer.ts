import {AnyAction, CombinedState, combineReducers, Reducer} from 'redux';
import {HYDRATE} from "next-redux-wrapper";
import eventsSlice, {initialEventsState} from "@/store/slices/eventsSlice";
import searchSlice, {initialSearchState} from "@/store/slices/searchSlice";
import layoutSlice, {initialLayoutState} from "@/store/slices/layoutSlice";

const rootReducer: Reducer = (state: initialState, action: AnyAction): CombinedState<initialState> => {
    switch (action.type) {
        case HYDRATE:
            return action.payload
        default:
            return combineReducers({
                events: eventsSlice,
                search: searchSlice,
                layout: layoutSlice
            })(state, action)
    }
}
export interface initialState {
    events: initialEventsState
    search: initialSearchState
    layout: initialLayoutState
}
export type RootState = initialState
export type RootReducer = (state: initialState, action: AnyAction) => initialState
export default rootReducer;