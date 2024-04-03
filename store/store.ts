import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from "next-redux-wrapper";
import rootReducer from "@/store/rootReducer";
// refactoring: clear

// the uppermost wrapper of redux
const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
    })
}
export const storeWrapper = createWrapper(makeStore);
