import {useEffect} from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";

const useStateFromStorage = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleRouteChangeComplete = () => {
            const current = JSON.parse(sessionStorage.getItem('current') || '{}')
            if (current["state"] && Object.keys(current["state"]).length > 0) {
                let state = current["state"]
                let contentsSlice = state["contents"]
                let appearanceSlice = state["appearance"]
                appearanceSlice["lastAction"] = 'rehydrate'
                appearanceSlice["scrollTop"] = current["scrollTop"]
                dispatch({type: 'REHYDRATE', payload: {appearance: appearanceSlice, contents: contentsSlice}})
            }
        }
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [])
}
export default useStateFromStorage