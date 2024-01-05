import '@/styles/global.css'
import {Provider} from "react-redux";
import type { AppProps } from 'next/app'
import {storeWrapper} from '@/store/store'
import Layout from '@/components/layout/layout'
import DynamicHead from "@/components/dynamicHead";
// refactoring; clear

function App({ Component, ...rest }: AppProps) {
    const {store, props} = storeWrapper.useWrappedStore(rest)
    return (
        <Provider store={store}>
            <DynamicHead type={'root'} />
            <Layout>
                  <Component {...props.pageProps} />
            </Layout>
        </Provider>
    )
}
export default App