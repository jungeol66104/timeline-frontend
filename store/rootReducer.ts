import { combineReducers } from 'redux';
import eventsSlice from "@/store/slices/eventsSlice";
import searchSlice from "@/store/slices/searchSlice";
import layoutSlice from "@/store/slices/layoutSlice";

const rootReducer = combineReducers({
    events: eventsSlice,
    search: searchSlice,
    layout: layoutSlice
});

export default rootReducer;