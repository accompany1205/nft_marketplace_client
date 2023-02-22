import type { AppProps } from 'next/app';
import '../styles/style.scss';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import Navbar from '../components/Navbar';
import { persistor, store } from '../redux/store';
import appSlice from '../redux/service/appService';
import RouteGuard from '../components/RouteGuard';
import WalletProvider from '../services/WalletService/WalletProvider';
import SnackBar from '../components/Toast';
import Footer from '../components/Footer';
import '../public/static/css/coloring.css';

const App:React.FC<AppProps> = ({ Component, pageProps }) => (
  <ApiProvider api={appSlice}>
    <Provider store={store}>
      <SnackBar>
        <RouteGuard>
          <PersistGate persistor={persistor} loading={null}>
            <WalletProvider>
              <div className="wraper">
                <Navbar />
                <Component {...pageProps} />
              </div>
              <Footer />
            </WalletProvider>
          </PersistGate>
        </RouteGuard>
      </SnackBar>
    </Provider>
  </ApiProvider>
);

export default App;
