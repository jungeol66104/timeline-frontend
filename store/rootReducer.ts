import { combineReducers } from 'redux';
import eventsSlice from "@/store/slices/eventsSlice";
import searchSlice from "@/store/slices/searchSlice";

const rootReducer = combineReducers({
    events: eventsSlice,
    search: searchSlice
});

export default rootReducer;