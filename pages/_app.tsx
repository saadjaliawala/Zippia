import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    if(window.location.pathname != '/test/jobs')
      window.location.pathname = '/test/jobs'; 
  },[])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;