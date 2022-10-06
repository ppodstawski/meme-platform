import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../views/components/Layout/Layout';
import AuthProvider from '../views/store/auth-context';
import '../views/styles/reset.scss';
import '../views/styles/index.scss';
import '../views/styles/global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
