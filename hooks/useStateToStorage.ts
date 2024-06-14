import {useEffect} from "react";
import {useStore} from "react-redux";
import {useRouter} from "next/router";
import {getScrollWrapper} from "@/utils/global";
import {initialState} from "@/store/rootReducer";

const useStateToStorage = () => {
    const router = useRouter()
    const store = useStore()

    useEffect(() => {

        const handleRouteChange = (url: string) => {
            const scrollWrapper = getScrollWrapper()
            if (!scrollWrapper) return

            let state = store.getState() as initialState
            // IMPORTANT: remove personal information
            state = {...state, personal: {session: {}}}

            const current = JSON.parse(sessionStorage.getItem('current') || JSON.stringify({"url": "initialUrl", "scrollTop": 0, "state": {}}))
            const history = JSON.parse(sessionStorage.getItem('history') || JSON.stringify({"0": {"url": "initialUrl", "scrollTop": 0, "state": {}}, "1": {"url": "initialUrl", "scrollTop": 0, "state": {}}, "2": {"url": "initialUrl", "scrollTop": 0, "state": {}}}))
            const historyUrls = Object.values(history).map(packet => (packet as { url: string })["url"])
            if (current["url"] !== url) {
                const newHistory = {"0": {...current, "scrollTop": scrollWrapper.scrollTop, "state": state}, "1": history["0"], "2": history["1"]}
                let newCurrent = {"url": url, "scrollTop": 0, "state": {}}
                if (historyUrls.includes(url)) {
                    const urlIndex = historyUrls.findIndex(historyUrl => historyUrl === url)
                    newCurrent = history[urlIndex.toString()]
                }
                sessionStorage.setItem('current', JSON.stringify(newCurrent));
                sessionStorage.setItem('history', JSON.stringify(newHistory));
            }
        }
        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);
}
export default useStateToStorage