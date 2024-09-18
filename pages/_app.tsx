import 'nprogress/nprogress.css';
import '@/styles/global.css'
import React from "react";
import {Provider} from "react-redux";
import {AppProps} from 'next/app'
import {storeWrapper} from '@/store/store'
import * as gtag from "../utils/gtags"
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