import '@/styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {storeWrapper} from '@/store/store'
import {Provider} from "react-redux";
import Layout from '@/components/layout/layout'
import DynamicHead from "@/components/dynamicHead";
// refactoring; clear

function App({ Component, ...rest }: AppProps) {
    const {store, props} = storeWrapper.useWrappedStore(rest)
    return (
        <Provider store={store}>
            <Layout>
                  <Component {...props.pageProps} />
            </Layout>
        </Provider>
    )
}
export default App