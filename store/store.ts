import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from "next-redux-wrapper";
import rootReducer from "@/store/rootReducer";
// import logger from 'redux-logger'
// refactoring: clear

const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
    })
}
export const storeWrapper = createWrapper(makeStore);
