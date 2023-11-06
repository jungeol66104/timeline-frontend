import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {storeWrapper} from '@/store/store'
import {Provider, useDispatch} from "react-redux";
import Layout from '../components/layout'
import {useEffect} from "react";
import {updateViewportHeight} from "@/store/slices/appearanceSlice";
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