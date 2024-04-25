import '@/styles/global.css'
import {Provider} from "react-redux";
import type { AppProps } from 'next/app'
import {storeWrapper} from '@/store/store'
import Layout from '@/components/layout/layout'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import * as gtag from "../utils/gtags"

function App({ Component, ...rest }: AppProps) {
    const {store, props} = storeWrapper.useWrappedStore(rest)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    gtag.useGtag()

    useEffect(() => {
        const start = ()=> {setLoading(true)}
        const end = () => {setLoading(false)}

        router.events.on("routeChangeStart", start)
        router.events.on("routeChangeComplete", end)
        router.events.on("routeChangeError", end)
        return () => {
            router.events.off("routeChangeStart", start)
            router.events.off("routeChangeComplete", end)
            router.events.off("routeChangeError", end)
        };
    }, []);

    return (
        <Provider store={store}>
            <Layout>
                {/*{loading*/}
                {/*    ? <div></div>*/}
                {/*    : <Component {...props.pageProps} />*/}
                {/*}*/}
                <Component {...props.pageProps} />
            </Layout>
        </Provider>
    )
}
export default App