import {AnyAction, CombinedState, combineReducers, Reducer} from 'redux';
import {HYDRATE} from "next-redux-wrapper";
import contentsSlice, {initialContentsState} from "@/store/slices/contentsSlice";
import appearanceSlice, {initialAppearanceState} from "@/store/slices/appearanceSlice";
import privateSlice, {initialPrivateState} from "@/store/slices/privateSlice";
import searchSlice, {initialSearchState} from "@/store/slices/searchSlice";

const rootReducer: Reducer = (state: initialState, action: AnyAction): CombinedState<initialState> => {
    switch (action.type) {
        case HYDRATE:
            return action.payload
        case "REHYDRATE":
            return {...state, contents: action.payload.contents, appearance: action.payload.appearance};
        default:
            return combineReducers({
                appearance: appearanceSlice,
                contents: contentsSlice,
                private: privateSlice,
                search: searchSlice
            })(state, action)
    }
}
export default rootReducer;

// types
export interface initialState {
    appearance: initialAppearanceState
    contents: initialContentsState
    private: initialPrivateState
    search: initialSearchState
}
export type RootState = initialState
