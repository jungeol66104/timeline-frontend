import {AnyAction, CombinedState, combineReducers, Reducer} from 'redux';
import {HYDRATE} from "next-redux-wrapper";
import eventsSlice, {initialEventsState} from "@/store/slices/eventsSlice";
import effectsSlice, {initialEffectsState} from "@/store/slices/effectsSlice";
import searchSlice, {initialSearchState} from "@/store/slices/searchSlice";
// refactoring: clear

const rootReducer: Reducer = (state: initialState, action: AnyAction): CombinedState<initialState> => {
    switch (action.type) {
        case HYDRATE:
            return action.payload
        default:
            return combineReducers({
                events: eventsSlice,
                search: searchSlice,
                effects: effectsSlice
            })(state, action)
    }
}
export default rootReducer;

// types
export interface initialState {
    events: initialEventsState
    search: initialSearchState
    effects: initialEffectsState
}
export type RootState = initialState
