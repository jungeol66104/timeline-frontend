import { combineReducers } from 'redux';
import eventsSlice from "@/store/slices/eventsSlice";

const rootReducer = combineReducers({
    events: eventsSlice
});

export default rootReducer;