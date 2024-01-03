import '@/styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {storeWrapper} from '@/store/store'
import {Provider} from "react-redux";
import Layout from '@/components/layout/layout'
// refactoring; clear

function App({ Component, ...rest }: AppProps) {
    const {store, props} = storeWrapper.useWrappedStore(rest)
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>Timeline</title>
                <meta name="description" content="모든 사건들에 대한 타임라인" />
                <meta name="viewport" content="initail-scale=1.0, width=device-width" />
            </Head>
            <Provider store={store}>
                <Layout>
                      <Component {...props.pageProps} />
                </Layout>
            </Provider>
        </>
    )
}
export default App