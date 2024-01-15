import {configureStore, Middleware} from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import rootReducer from "@/store/rootReducer";
// refactoring: clear

// the uppermost wrapper of redux
const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(saveStateMiddleware)
    })
}

const saveStateMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    if (typeof window === 'undefined') return result
    const currentUrl = window.location.href;
    if (!currentUrl.includes('/timelines/')) return result

    const state = store.getState();
    let statePacket = JSON.parse(sessionStorage.getItem('statePacket') || '{}')
    if (action.type === HYDRATE) {
        if (statePacket.url === currentUrl) return result
        else {
            statePacket = {url: currentUrl, state: state}
            sessionStorage.setItem('scrollTop', '0')
        }
    } else statePacket = {...statePacket, state: state}

    sessionStorage.setItem('statePacket', JSON.stringify(statePacket));
    return result;
};

export const storeWrapper = createWrapper(makeStore);
