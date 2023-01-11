import type { AppProps } from 'next/app'
import '../styles/style.scss';
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import Navbar from '../components/Navbar';
import { Provider } from 'react-redux';
import {  persistor, store } from '../redux/store';
import appSlice from "../redux/service/appService";
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  return <ApiProvider api={appSlice}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <div className="wraper">
        <Navbar />
        <Component {...pageProps} />
      </div>
      </PersistGate>
    </Provider>
  </ApiProvider>
}
