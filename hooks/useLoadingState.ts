import {useState, useEffect, useLayoutEffect} from 'react';
import { useRouter } from 'next/router';
import NProgress from "@/utils/nprogress";
import {getScrollWrapper} from "@/utils/global";
import {initialState} from "@/store/rootReducer";
import {useDispatch, useStore} from "react-redux";
import {updateAdjustScrollTop} from "@/store/slices/appearanceSlice";

const useLoadingState = () => {
    const [loadingState, setLoadingState] = useState('none');
    const router = useRouter();
    const store = useStore()
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        const start = (url: string) => {
            // loading
            NProgress.start()
            setLoadingState('preparing');

            // session state management
            const scrollWrapper = getScrollWrapper()
            if (!scrollWrapper) return

            let state = store.getState() as initialState
            // IMPORTANT: remove personal information
            state = {...state, private: {session: {}, profileType: state.private.profileType, profile: state.private.profile, profileDraft: state.private.profileDraft}}
            const current = JSON.parse(sessionStorage.getItem('current') || JSON.stringify({"url": "initialUrl", "scrollTop": 0, "state": {}}))
            const history = JSON.parse(sessionStorage.getItem('history') || JSON.stringify({"0": {"url": "initialUrl", "scrollTop": 0, "state": {}}, "1": {"url": "initialUrl", "scrollTop": 0, "state": {}}, "2": {"url": "initialUrl", "scrollTop": 0, "state": {}}}))
            const historyUrls = Object.values(history).map(packet => (packet as { url: string })["url"])
            if (current["url"] !== url) {
                let newCurrent = {"url": url, "scrollTop": 0, "state": {}}
                const newHistory = {"0": {...current, "scrollTop": scrollWrapper.scrollTop, "state": state}, "1": history["0"], "2": history["1"]}
                if (historyUrls.includes(url)) {
                    const urlIndex = historyUrls.findIndex(historyUrl => historyUrl === url)
                    newCurrent = history[urlIndex.toString()]
                }
                sessionStorage.setItem('current', JSON.stringify(newCurrent));
                sessionStorage.setItem('history', JSON.stringify(newHistory));
            }
            dispatch(updateAdjustScrollTop(false))
        }
        const middle = () => {
            setLoadingState('applying');
            dispatch(updateAdjustScrollTop(true))
        }
        const end = () => {
            // loading
            setLoadingState('none');
            NProgress.done()

            // session state management
            const current = JSON.parse(sessionStorage.getItem('current') || '{}')
            if (current["state"] && Object.keys(current["state"]).length > 0) {
                let state = current["state"]
                let contentsSlice = state["contents"]
                let appearanceSlice = state["appearance"]
                appearanceSlice["adjustScrollTop"] = true
                appearanceSlice["scrollTop"] = current["scrollTop"]
                dispatch({type: 'REHYDRATE', payload: {appearance: appearanceSlice, contents: contentsSlice}})
            }
        }

        router.events.on('routeChangeStart', start);
        router.events.on('beforeHistoryChange', middle);
        router.events.on('routeChangeComplete', end);
        router.events.on('routeChangeError', end);

        return () => {
            router.events.off('routeChangeStart', start);
            router.events.off('beforeHistoryChange', middle);
            router.events.off('routeChangeComplete', end);
            router.events.off('routeChangeError', end);
        };
    }, [router.events]);

    return loadingState;
};

export default useLoadingState;
