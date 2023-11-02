import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import {persistor, storeWrapper} from '@/store/store'
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";

function App({ Component, ...rest }: AppProps) {
    const {store, props} = storeWrapper.useWrappedStore(rest)

  return (
      <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
              <Layout>
                  <Component {...props.pageProps} />
              </Layout>
          </PersistGate>
      </Provider>
  )
}

export default App