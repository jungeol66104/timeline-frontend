import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from "next-redux-wrapper";
import rootReducer from "@/store/rootReducer";
import logger from 'redux-logger'
// refactoring: clear

// the uppermost wrapper of redux
const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
    })
}

// enables the server to use redux and maintain the store after SSR
export const storeWrapper = createWrapper(makeStore);
