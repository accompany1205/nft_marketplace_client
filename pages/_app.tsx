import type { AppProps } from 'next/app';
import '../styles/style.scss';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { persistor, store } from '../redux/store';
import appSlice from '../redux/service/appService';
import RouteGuard from '../components/RouteGuard';
import WalletProvider from '../services/WalletService/WalletProvider';
import SnackBar from '../components/Toast';
import Footer from '../components/Footer';
import '../public/static/css/coloring.css';
import '../public/static/css/colors/scheme-01.css';

const App:React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/static/js/designesia.js';
    script.async = true;
    script.defer = true;
    const interval = setInterval(() => {
      if ((window as any).jQuery !== undefined) {
        (window as any).loaded = true;
        clearInterval(interval);
        document.body.appendChild(script);
      }
    }, 100);
    return () => {
      clearInterval(interval);
      if ((window as any).loaded) {
        document.body.removeChild(script);
      }
    };
  }, []);
  return (
    <ApiProvider api={appSlice}>
      <Provider store={store}>
        <SnackBar>
          <RouteGuard>
            <PersistGate persistor={persistor} loading={null}>
              <Head>
                <script src="/static/js/plugins.js" async />
              </Head>
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
};

export default App;
