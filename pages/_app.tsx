import '@/styles/global.css'
import * as gtag from "../utils/gtags"
import React from "react";
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import {storeWrapper} from '@/store/store'
import Layout from '@/components/layout/layout'

function App({ Component, ...rest }: AppProps) {
    const {store, props} = storeWrapper.useWrappedStore(rest)
    gtag.useGtag()

    return (
        <Provider store={store}>
                <Layout>
                    <Component {...props.pageProps} />
                </Layout>
        </Provider>
    )
}
export default App