import type { AppProps } from 'next/app';
import '../styles/style.scss';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navbar from '../components/Navbar';
import { persistor, store } from '../redux/store';
import appSlice from '../redux/service/appService';
import RouteGuard from '../components/RouteGuard';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApiProvider api={appSlice}>
      <Provider store={store}>
        <RouteGuard>
          <PersistGate persistor={persistor} loading={null}>
            <div className="wraper">
              <Navbar />
              <Component {...pageProps} />
            </div>
          </PersistGate>
        </RouteGuard>
      </Provider>
    </ApiProvider>
  );
}
