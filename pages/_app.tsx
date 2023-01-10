import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "../styles/animated.css";
import '../node_modules/elegant-icons/style.css';
import '../node_modules/et-line/style.css';
import '../styles/style.scss';
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import appSlice from "../redux/service/appService";

export default function App({ Component, pageProps }: AppProps) {
  return <ApiProvider api={appSlice}>
    <Provider store={store}>
      <div className="wraper">
        <Navbar />
        <Component {...pageProps} />
      </div>
      <Footer />
    </Provider>
  </ApiProvider>
}
