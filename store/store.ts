import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from "next-redux-wrapper";
import storage from 'redux-persist/lib/storage/session'
import {persistReducer, persistStore} from "redux-persist";
import rootReducer from "@/store/rootReducer";
import logger from 'redux-logger'
import {Reducer} from "redux";

const makeStore = () => {
    const isServer = typeof window === 'undefined'
    const makeConfiguredStore = (reducer: Reducer) => {
        return configureStore({
            reducer: reducer,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger)
        })
    }
    if (isServer) return makeConfiguredStore(rootReducer)
    else {
        const persistConfig = {
            key: 'root',
            storage,
            whitelist: ['events','layout','search']
        }
        const persistedReducer= persistReducer(persistConfig, rootReducer)
        return makeConfiguredStore(persistedReducer)
    }
}

const store: ReturnType<typeof makeStore> = makeStore()
export const storeWrapper = createWrapper(makeStore);
export const persistor = persistStore(store)
