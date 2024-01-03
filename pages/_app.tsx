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
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Discover dynamic timelines. Unveiling history and diverse subjects in a clean, interactive format. Explore past, present, and future seamlessly with our engaging timelines." />
                <meta name="keywords" content="timeilne, event, history, humanity" />
                <meta name="author" content="Project Yaha" />
                <meta property="og:title" content="Timeline" />
                <meta property="og:description" content="Discover dynamic timelines. Unveiling history and diverse subjects in a clean, interactive format. Explore past, present, and future seamlessly with our engaging timelines." />
                <meta property="og:url" content="https://timeline.vg" />
                <meta property="og:image" content="/ogImage.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Timeline" />
                <meta name="twitter:description" content="Discover dynamic timelines. Unveiling history and diverse subjects in a clean, interactive format. Explore past, present, and future seamlessly with our engaging timelines." />
                <meta name="twitter:image" content="/twitterImage.png" />
                <link rel="canonical" href="https://timeline.vg" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <title>Timeline</title>
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