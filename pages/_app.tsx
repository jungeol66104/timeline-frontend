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
                <meta name="description" content="Discover dynamic timelines. Unveiling history and diverse subjects in a clean, interactive format. Explore past, present, and future seamlessly with our engaging timelines." />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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